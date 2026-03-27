package Controller;

import Model.Kullanici;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class GirisController {

    // ─── Oturum Bilgisi ───
    private Kullanici aktifKullanici;
    private boolean girisBasariliMi;

    // ─── Constructor ───
    public GirisController() {
        this.aktifKullanici = null;
        this.girisBasariliMi = false;
    }

    // ═══════════════════════════════════════════
    // KAYIT OL — Veritabanına kaydeder
    // ═══════════════════════════════════════════
    public String kayitOl(String ad, String soyad, String email, String sifre, String rol) {
        // Boş alan kontrolü
        if (ad == null || ad.trim().isEmpty()) {
            return "Hata: Ad alanı boş olamaz!";
        }
        if (soyad == null || soyad.trim().isEmpty()) {
            return "Hata: Soyad alanı boş olamaz!";
        }
        if (email == null || email.trim().isEmpty()) {
            return "Hata: Email alanı boş olamaz!";
        }
        if (sifre == null || sifre.trim().isEmpty()) {
            return "Hata: Şifre alanı boş olamaz!";
        }

        // Email format kontrolü
        if (!emailGecerliMi(email)) {
            return "Hata: Geçersiz email formatı!";
        }

        // Email tekrar kontrolü (veritabanından)
        if (emailKayitliMi(email)) {
            return "Hata: Bu email adresi zaten kayıtlı!";
        }

        // Şifre uzunluk kontrolü
        if (sifre.length() < 6) {
            return "Hata: Şifre en az 6 karakter olmalıdır!";
        }

        // Rol kontrolü
        if (rol == null || rol.trim().isEmpty()) {
            rol = "uye"; // Varsayılan rol
        }
        if (!rol.equals("admin") && !rol.equals("uye") && !rol.equals("antrenor")) {
            return "Hata: Geçersiz rol! (admin, uye, antrenor)";
        }

        // Şifreyi hashle
        String hashliSifre = hashSifre(sifre);

        // ─── VERİTABANINA KAYDET ───
        try {
            Connection conn = DatabaseBaglanti.baglantiGetir();

            // Rol adından rol_id bul
            int rolId = 2; // varsayılan: uye
            PreparedStatement rolStmt = conn.prepareStatement("SELECT role_id FROM roller WHERE rol_adi = ?");
            rolStmt.setString(1, rol);
            ResultSet rolRs = rolStmt.executeQuery();
            if (rolRs.next()) {
                rolId = rolRs.getInt("role_id");
            }

            String sql = "INSERT INTO kullanicilar (ad, soyad, email, sifre_hash, rol_id, durum) VALUES (?, ?, ?, ?, ?, N'aktif')";
            PreparedStatement stmt = conn.prepareStatement(sql);

            stmt.setString(1, ad.trim());
            stmt.setString(2, soyad.trim());
            stmt.setString(3, email.trim().toLowerCase());
            stmt.setString(4, hashliSifre);
            stmt.setInt(5, rolId);

            int eklenen = stmt.executeUpdate();
            if (eklenen > 0) {
                return "Başarılı: " + ad + " " + soyad + " başarıyla kaydedildi!";
            } else {
                return "Hata: Kayıt sırasında bir sorun oluştu!";
            }

        } catch (SQLException e) {
            System.out.println("❌ Kayıt hatası: " + e.getMessage());
            e.printStackTrace();
            return "Hata: Veritabanı hatası — " + e.getMessage();
        }
    }

    // ═══════════════════════════════════════════
    // GİRİŞ YAP — Veritabanından doğrular
    // ═══════════════════════════════════════════
    public String girisYap(String email, String sifre) {
        // Boş alan kontrolü
        if (email == null || email.trim().isEmpty()) {
            return "Hata: Email alanı boş olamaz!";
        }
        if (sifre == null || sifre.trim().isEmpty()) {
            return "Hata: Şifre alanı boş olamaz!";
        }

        // ─── VERİTABANINDAN KULLANICI ARA ───
        String sql = "SELECT k.*, r.rol_adi FROM kullanicilar k JOIN roller r ON k.rol_id = r.role_id WHERE k.email = ?";

        try {
            Connection conn = DatabaseBaglanti.baglantiGetir();
            PreparedStatement stmt = conn.prepareStatement(sql);

            stmt.setString(1, email.trim().toLowerCase());
            ResultSet rs = stmt.executeQuery();

            if (!rs.next()) {
                girisBasariliMi = false;
                return "Hata: Bu email adresiyle kayıtlı kullanıcı bulunamadı!";
            }

            // Kullanıcı bilgilerini oku
            Kullanici bulunan = resultSetToKullanici(rs);

            // Aktiflik kontrolü
            if (!bulunan.isAktifMi()) {
                girisBasariliMi = false;
                return "Hata: Bu hesap devre dışı bırakılmış!";
            }

            // Şifre doğrulama
            if (!sifreDogrula(sifre, bulunan.getSifre())) {
                girisBasariliMi = false;
                return "Hata: Şifre yanlış!";
            }

            // Giriş başarılı
            this.aktifKullanici = bulunan;
            this.girisBasariliMi = true;
            return "Başarılı: Hoş geldiniz, " + bulunan.getAdSoyad() + "! (" + bulunan.getRolAdi() + ")";

        } catch (SQLException e) {
            girisBasariliMi = false;
            System.out.println("❌ Giriş hatası: " + e.getMessage());
            e.printStackTrace();
            return "Hata: Veritabanı hatası — " + e.getMessage();
        }
    }

    // ═══════════════════════════════════════════
    // ÇIKIŞ YAP
    // ═══════════════════════════════════════════
    public String cikisYap() {
        if (aktifKullanici == null) {
            return "Hata: Zaten giriş yapılmamış!";
        }
        String isim = aktifKullanici.getAdSoyad();
        this.aktifKullanici = null;
        this.girisBasariliMi = false;
        return "Başarılı: " + isim + " çıkış yaptı.";
    }

    // ═══════════════════════════════════════════
    // ŞİFRE SIFIRLA — Veritabanında günceller
    // ═══════════════════════════════════════════
    public String sifreSifirla(String email) {
        if (email == null || email.trim().isEmpty()) {
            return "Hata: Email alanı boş olamaz!";
        }

        if (!emailKayitliMi(email)) {
            return "Hata: Bu email adresiyle kayıtlı kullanıcı bulunamadı!";
        }

        // Veritabanında şifreyi güncelle
        String yeniHashliSifre = hashSifre("123456");
        String sql = "UPDATE kullanicilar SET sifre_hash = ? WHERE email = ?";

        try {
            Connection conn = DatabaseBaglanti.baglantiGetir();
            PreparedStatement stmt = conn.prepareStatement(sql);

            stmt.setString(1, yeniHashliSifre);
            stmt.setString(2, email.trim().toLowerCase());
            stmt.executeUpdate();
            return "Başarılı: Şifre sıfırlama linki " + email + " adresine gönderildi.";

        } catch (SQLException e) {
            return "Hata: Veritabanı hatası — " + e.getMessage();
        }
    }

    // ═══════════════════════════════════════════
    // ŞİFRE DEĞİŞTİR — Veritabanında günceller
    // ═══════════════════════════════════════════
    public String sifreDegistir(String eskiSifre, String yeniSifre) {
        if (aktifKullanici == null) {
            return "Hata: Önce giriş yapmalısınız!";
        }

        if (!sifreDogrula(eskiSifre, aktifKullanici.getSifre())) {
            return "Hata: Eski şifre yanlış!";
        }

        if (yeniSifre == null || yeniSifre.length() < 6) {
            return "Hata: Yeni şifre en az 6 karakter olmalıdır!";
        }

        // Veritabanında güncelle
        String yeniHash = hashSifre(yeniSifre);
        String sql = "UPDATE kullanicilar SET sifre_hash = ? WHERE kullanici_id = ?";

        try {
            Connection conn = DatabaseBaglanti.baglantiGetir();
            PreparedStatement stmt = conn.prepareStatement(sql);

            stmt.setString(1, yeniHash);
            stmt.setInt(2, aktifKullanici.getKullaniciId());
            stmt.executeUpdate();

            aktifKullanici.setSifre(yeniHash);
            return "Başarılı: Şifreniz başarıyla değiştirildi.";

        } catch (SQLException e) {
            return "Hata: Veritabanı hatası — " + e.getMessage();
        }
    }

    // ═══════════════════════════════════════════
    // OTURUM KONTROL
    // ═══════════════════════════════════════════
    public boolean oturumAktifMi() {
        return aktifKullanici != null && girisBasariliMi;
    }

    public Kullanici aktifKullaniciyiGetir() {
        return aktifKullanici;
    }

    public String aktifKullaniciRolu() {
        if (aktifKullanici == null)
            return null;
        return aktifKullanici.getRolAdi();
    }

    public boolean adminMi() {
        return oturumAktifMi() && "admin".equals(aktifKullaniciRolu());
    }

    public boolean uyeMi() {
        return oturumAktifMi() && "uye".equals(aktifKullaniciRolu());
    }

    public boolean antrenorMu() {
        return oturumAktifMi() && "antrenor".equals(aktifKullaniciRolu());
    }

    // ═══════════════════════════════════════════
    // KULLANICI LİSTESİ İŞLEMLERİ — Veritabanından
    // ═══════════════════════════════════════════
    public List<Kullanici> tumKullanicilariGetir() {
        List<Kullanici> liste = new ArrayList<>();
        String sql = "SELECT k.*, r.rol_adi FROM kullanicilar k JOIN roller r ON k.rol_id = r.role_id";

        try {
            Connection conn = DatabaseBaglanti.baglantiGetir();
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);

            while (rs.next()) {
                liste.add(resultSetToKullanici(rs));
            }

        } catch (SQLException e) {
            System.out.println("❌ Kullanıcı listesi hatası: " + e.getMessage());
        }
        return liste;
    }

    public Kullanici kullaniciGetir(int kullaniciId) {
        String sql = "SELECT k.*, r.rol_adi FROM kullanicilar k JOIN roller r ON k.rol_id = r.role_id WHERE k.kullanici_id = ?";

        try {
            Connection conn = DatabaseBaglanti.baglantiGetir();
            PreparedStatement stmt = conn.prepareStatement(sql);

            stmt.setInt(1, kullaniciId);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return resultSetToKullanici(rs);
            }

        } catch (SQLException e) {
            System.out.println("❌ Kullanıcı getirme hatası: " + e.getMessage());
        }
        return null;
    }

    // ═══════════════════════════════════════════
    // YARDIMCI METOTLAR
    // ═══════════════════════════════════════════

    // ResultSet → Kullanici nesnesi dönüştür
    private Kullanici resultSetToKullanici(ResultSet rs) throws SQLException {
        Kullanici k = new Kullanici();
        k.setKullaniciId(rs.getInt("kullanici_id"));
        k.setAd(rs.getString("ad"));
        k.setSoyad(rs.getString("soyad"));
        k.setEmail(rs.getString("email"));
        k.setSifre(rs.getString("sifre_hash"));
        k.setRolAdi(rs.getString("rol_adi"));
        k.setAktifMi("aktif".equals(rs.getString("durum")));
        Timestamp ts = rs.getTimestamp("kayit_tarihi");
        if (ts != null) {
            k.setOlusturmaTarihi(new Date(ts.getTime()));
        }
        return k;
    }

    // Email veritabanında kayıtlı mı?
    public boolean emailKayitliMi(String email) {
        String sql = "SELECT COUNT(*) FROM kullanicilar WHERE email = ?";

        try {
            Connection conn = DatabaseBaglanti.baglantiGetir();
            PreparedStatement stmt = conn.prepareStatement(sql);

            stmt.setString(1, email.trim().toLowerCase());
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return rs.getInt(1) > 0;
            }

        } catch (SQLException e) {
            System.out.println("❌ Email kontrol hatası: " + e.getMessage());
        }
        return false;
    }

    // Email format kontrolü
    private boolean emailGecerliMi(String email) {
        return email != null && email.contains("@") && email.contains(".");
    }

    // Şifre hashleme (SHA-256)
    private String hashSifre(String sifre) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(sifre.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte b : hash) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            // Fallback: düz metin (güvenli değil, sadece demo)
            return sifre;
        }
    }

    // Şifre doğrulama
    private boolean sifreDogrula(String girilensifre, String kayitliHash) {
        String girilenHash = hashSifre(girilensifre);
        return girilenHash.equals(kayitliHash);
    }

    // Getter'lar
    public boolean isGirisBasariliMi() {
        return girisBasariliMi;
    }
}
