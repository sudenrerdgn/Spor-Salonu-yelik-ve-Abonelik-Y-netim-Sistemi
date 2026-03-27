package Controller;

import Model.Abonelik;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class AbonelikController {

    // ─── Abonelik Veritabanı (Demo) ───
    private List<Abonelik> abonelikListesi;
    private int sonId;

    // ─── Constructor ───
    public AbonelikController() {
        this.abonelikListesi = new ArrayList<>();
        this.sonId = 0;
    }

    // ═══════════════════════════════════════════
    // ABONELİK EKLE
    // ═══════════════════════════════════════════
    public String abonelikEkle(Abonelik abonelik) {
        if (abonelik == null) {
            return "Hata: Abonelik bilgisi boş olamaz!";
        }
        if (abonelik.getUyeId() <= 0) {
            return "Hata: Geçerli bir üye seçilmelidir!";
        }
        if (abonelik.getPlan() == null || abonelik.getPlan().trim().isEmpty()) {
            return "Hata: Plan seçilmelidir!";
        }

        sonId++;
        abonelik.setAbonelikId(sonId);

        if (abonelik.getDurum() == null) {
            abonelik.setDurum("aktif");
        }

        abonelikListesi.add(abonelik);
        return "Başarılı: Abonelik oluşturuldu. (ID: " + sonId + ")";
    }

    // ═══════════════════════════════════════════
    // ABONELİK GETİR
    // ═══════════════════════════════════════════
    public Abonelik abonelikGetir(int abonelikId) {
        for (Abonelik a : abonelikListesi) {
            if (a.getAbonelikId() == abonelikId) {
                return a;
            }
        }
        return null;
    }

    // ═══════════════════════════════════════════
    // ÜYE ABONELİKLERİNİ GETİR
    // ═══════════════════════════════════════════
    public List<Abonelik> uyeAbonelikleriGetir(int uyeId) {
        return abonelikListesi.stream()
                .filter(a -> a.getUyeId() == uyeId)
                .collect(Collectors.toList());
    }

    // ═══════════════════════════════════════════
    // TÜM ABONELİKLERİ GETİR
    // ═══════════════════════════════════════════
    public List<Abonelik> tumAbonelikleriGetir() {
        return new ArrayList<>(abonelikListesi);
    }

    // ═══════════════════════════════════════════
    // ABONELİK GÜNCELLE
    // ═══════════════════════════════════════════
    public String abonelikGuncelle(Abonelik guncel) {
        Abonelik mevcut = abonelikGetir(guncel.getAbonelikId());
        if (mevcut == null) {
            return "Hata: Abonelik bulunamadı!";
        }

        if (guncel.getPlan() != null)
            mevcut.setPlan(guncel.getPlan());
        if (guncel.getDurum() != null)
            mevcut.setDurum(guncel.getDurum());
        if (guncel.getBaslangicTarihi() != null)
            mevcut.setBaslangicTarihi(guncel.getBaslangicTarihi());
        if (guncel.getBitisTarihi() != null)
            mevcut.setBitisTarihi(guncel.getBitisTarihi());
        mevcut.setOtomatikYenileme(guncel.isOtomatikYenileme());

        return "Başarılı: Abonelik güncellendi.";
    }

    // ═══════════════════════════════════════════
    // ABONELİK İPTAL
    // ═══════════════════════════════════════════
    public String abonelikIptal(int abonelikId) {
        Abonelik mevcut = abonelikGetir(abonelikId);
        if (mevcut == null) {
            return "Hata: Abonelik bulunamadı!";
        }
        mevcut.setDurum("iptal");
        return "Başarılı: Abonelik iptal edildi.";
    }

    // ═══════════════════════════════════════════
    // İSTATİSTİKLER
    // ═══════════════════════════════════════════
    public int toplamAbonelikSayisi() {
        return abonelikListesi.size();
    }

    public int aktifAbonelikSayisi() {
        return (int) abonelikListesi.stream()
                .filter(a -> "aktif".equals(a.getDurum()))
                .count();
    }

    public int suresiDolmusAbonelikSayisi() {
        return (int) abonelikListesi.stream()
                .filter(a -> "suresi_doldu".equals(a.getDurum()))
                .count();
    }
}
