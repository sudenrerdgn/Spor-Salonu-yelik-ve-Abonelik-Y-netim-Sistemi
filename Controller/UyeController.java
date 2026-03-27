package Controller;

import Model.Uye;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class UyeController {

    // ─── Üye Veritabanı (Demo - backend bağlantısında DB'ye çevrilecek) ───
    private List<Uye> uyeListesi;
    private int sonId;

    // ─── Constructor ───
    public UyeController() {
        this.uyeListesi = new ArrayList<>();
        this.sonId = 0;
        varsayilanUyeleriYukle();
    }

    // ─── Varsayılan üyeleri yükle (Demo veriler) ───
    private void varsayilanUyeleriYukle() {
        uyeEkle(new Uye(0, "Ahmet", "Yılmaz", "ahmet@mail.com", "0532 111 11 11",
                "Erkek", "FZ-2026-001", "platinum", "aktif",
                parseDate("2026-01-15"), parseDate("2026-01-15"), parseDate("2027-01-15"),
                "kredi_karti", 850.00));

        uyeEkle(new Uye(0, "Fatma", "Kaya", "fatma@mail.com", "0533 222 22 22",
                "Kadın", "FZ-2026-002", "gold", "aktif",
                parseDate("2026-02-01"), parseDate("2026-02-01"), parseDate("2026-08-01"),
                "nakit", 550.00));

        uyeEkle(new Uye(0, "Can", "Öztürk", "can@mail.com", "0534 333 33 33",
                "Erkek", "FZ-2026-003", "silver", "aktif",
                parseDate("2026-01-01"), parseDate("2026-01-01"), parseDate("2026-04-01"),
                "havale", 350.00));

        uyeEkle(new Uye(0, "Selin", "Arslan", "selin@mail.com", "0535 444 44 44",
                "Kadın", "FZ-2026-004", "platinum", "aktif",
                parseDate("2025-12-01"), parseDate("2025-12-01"), parseDate("2026-12-01"),
                "kredi_karti", 850.00));

        uyeEkle(new Uye(0, "Emre", "Demir", "emre@mail.com", "0536 555 55 55",
                "Erkek", "FZ-2026-005", "basic", "aktif",
                parseDate("2026-03-01"), parseDate("2026-03-01"), parseDate("2026-04-01"),
                "nakit", 199.00));

        uyeEkle(new Uye(0, "Zeynep", "Şahin", "zeynep@mail.com", "0537 666 66 66",
                "Kadın", "FZ-2026-006", "gold", "suresi_doldu",
                parseDate("2025-11-01"), parseDate("2025-11-01"), parseDate("2026-02-01"),
                "online", 550.00));

        uyeEkle(new Uye(0, "Murat", "Çelik", "murat@mail.com", "0538 777 77 77",
                "Erkek", "FZ-2026-007", "silver", "aktif",
                parseDate("2026-02-15"), parseDate("2026-02-15"), parseDate("2026-05-15"),
                "kredi_karti", 350.00));

        uyeEkle(new Uye(0, "Ayşe", "Yıldız", "ayse@mail.com", "0539 888 88 88",
                "Kadın", "FZ-2026-008", "platinum", "aktif",
                parseDate("2026-01-20"), parseDate("2026-01-20"), parseDate("2027-01-20"),
                "kredi_karti", 850.00));
    }

    // ═══════════════════════════════════════════
    // ÜYE EKLE
    // ═══════════════════════════════════════════
    public String uyeEkle(Uye uye) {
        if (uye == null) {
            return "Hata: Üye bilgisi boş olamaz!";
        }
        if (uye.getAd() == null || uye.getAd().trim().isEmpty()) {
            return "Hata: Ad alanı boş olamaz!";
        }
        if (uye.getSoyad() == null || uye.getSoyad().trim().isEmpty()) {
            return "Hata: Soyad alanı boş olamaz!";
        }
        if (uye.getEmail() == null || uye.getEmail().trim().isEmpty()) {
            return "Hata: Email alanı boş olamaz!";
        }

        // Email tekrar kontrolü
        if (emailKayitliMi(uye.getEmail())) {
            return "Hata: Bu email zaten kayıtlı!";
        }

        // ID ata
        sonId++;
        uye.setUyeId(sonId);

        // Üyelik numarası oluştur (eğer yoksa)
        if (uye.getUyelikNo() == null || uye.getUyelikNo().trim().isEmpty()) {
            uye.setUyelikNo("FZ-2026-" + String.format("%03d", sonId));
        }

        // Kayıt tarihi ata (eğer yoksa)
        if (uye.getKayitTarihi() == null) {
            uye.setKayitTarihi(new Date());
        }

        // Durum ata (eğer yoksa)
        if (uye.getDurum() == null || uye.getDurum().trim().isEmpty()) {
            uye.setDurum("aktif");
        }

        uyeListesi.add(uye);
        return "Başarılı: " + uye.getAdSoyad() + " üye olarak eklendi. (No: " + uye.getUyelikNo() + ")";
    }

    // ═══════════════════════════════════════════
    // ÜYE SİL
    // ═══════════════════════════════════════════
    public String uyeSil(int uyeId) {
        Uye bulunan = uyeGetir(uyeId);
        if (bulunan == null) {
            return "Hata: Üye bulunamadı! (ID: " + uyeId + ")";
        }
        uyeListesi.remove(bulunan);
        return "Başarılı: " + bulunan.getAdSoyad() + " silindi.";
    }

    // ═══════════════════════════════════════════
    // ÜYE GÜNCELLE
    // ═══════════════════════════════════════════
    public String uyeGuncelle(Uye guncelUye) {
        if (guncelUye == null) {
            return "Hata: Üye bilgisi boş olamaz!";
        }

        Uye mevcut = uyeGetir(guncelUye.getUyeId());
        if (mevcut == null) {
            return "Hata: Güncellenecek üye bulunamadı! (ID: " + guncelUye.getUyeId() + ")";
        }

        // Bilgileri güncelle
        if (guncelUye.getAd() != null) mevcut.setAd(guncelUye.getAd());
        if (guncelUye.getSoyad() != null) mevcut.setSoyad(guncelUye.getSoyad());
        if (guncelUye.getEmail() != null) mevcut.setEmail(guncelUye.getEmail());
        if (guncelUye.getTelefon() != null) mevcut.setTelefon(guncelUye.getTelefon());
        if (guncelUye.getCinsiyet() != null) mevcut.setCinsiyet(guncelUye.getCinsiyet());
        if (guncelUye.getPlan() != null) mevcut.setPlan(guncelUye.getPlan());
        if (guncelUye.getDurum() != null) mevcut.setDurum(guncelUye.getDurum());
        if (guncelUye.getOdemeYontemi() != null) mevcut.setOdemeYontemi(guncelUye.getOdemeYontemi());
        if (guncelUye.getAbonelikBaslangic() != null) mevcut.setAbonelikBaslangic(guncelUye.getAbonelikBaslangic());
        if (guncelUye.getAbonelikBitis() != null) mevcut.setAbonelikBitis(guncelUye.getAbonelikBitis());

        return "Başarılı: " + mevcut.getAdSoyad() + " güncellendi.";
    }

    // ═══════════════════════════════════════════
    // ÜYE GETİR (ID ile)
    // ═══════════════════════════════════════════
    public Uye uyeGetir(int uyeId) {
        for (Uye u : uyeListesi) {
            if (u.getUyeId() == uyeId) {
                return u;
            }
        }
        return null;
    }

    // ═══════════════════════════════════════════
    // TÜM ÜYELERİ GETİR
    // ═══════════════════════════════════════════
    public List<Uye> tumUyeleriGetir() {
        return new ArrayList<>(uyeListesi);
    }

    // ═══════════════════════════════════════════
    // ÜYE ARA (İsim veya email ile)
    // ═══════════════════════════════════════════
    public List<Uye> uyeAra(String anahtar) {
        if (anahtar == null || anahtar.trim().isEmpty()) {
            return tumUyeleriGetir();
        }
        String aramaMetni = anahtar.toLowerCase().trim();
        return uyeListesi.stream()
                .filter(u -> u.getAdSoyad().toLowerCase().contains(aramaMetni)
                        || u.getEmail().toLowerCase().contains(aramaMetni)
                        || u.getUyelikNo().toLowerCase().contains(aramaMetni))
                .collect(Collectors.toList());
    }

    // ═══════════════════════════════════════════
    // DURUMA GÖRE FİLTRELE
    // ═══════════════════════════════════════════
    public List<Uye> durumFiltrele(String durum) {
        if (durum == null || durum.equals("hepsi")) {
            return tumUyeleriGetir();
        }
        return uyeListesi.stream()
                .filter(u -> u.getDurum().equals(durum))
                .collect(Collectors.toList());
    }

    // ═══════════════════════════════════════════
    // PLANA GÖRE FİLTRELE
    // ═══════════════════════════════════════════
    public List<Uye> planFiltrele(String plan) {
        if (plan == null || plan.equals("hepsi")) {
            return tumUyeleriGetir();
        }
        return uyeListesi.stream()
                .filter(u -> u.getPlan().equalsIgnoreCase(plan))
                .collect(Collectors.toList());
    }

    // ═══════════════════════════════════════════
    // İSTATİSTİKLER
    // ═══════════════════════════════════════════
    public int toplamUyeSayisi() {
        return uyeListesi.size();
    }

    public int aktifUyeSayisi() {
        return (int) uyeListesi.stream()
                .filter(u -> "aktif".equals(u.getDurum()))
                .count();
    }

    public int suresiDolanSayisi() {
        return (int) uyeListesi.stream()
                .filter(u -> "suresi_doldu".equals(u.getDurum()))
                .count();
    }

    // ═══════════════════════════════════════════
    // YARDIMCI METOTLAR
    // ═══════════════════════════════════════════
    private boolean emailKayitliMi(String email) {
        return uyeListesi.stream()
                .anyMatch(u -> u.getEmail().equalsIgnoreCase(email));
    }

    @SuppressWarnings("deprecation")
    private Date parseDate(String dateStr) {
        // Basit tarih parse (yyyy-MM-dd) — demo amaçlı
        try {
            String[] parts = dateStr.split("-");
            int year = Integer.parseInt(parts[0]) - 1900;
            int month = Integer.parseInt(parts[1]) - 1;
            int day = Integer.parseInt(parts[2]);
            return new Date(year, month, day);
        } catch (Exception e) {
            return new Date();
        }
    }
}
