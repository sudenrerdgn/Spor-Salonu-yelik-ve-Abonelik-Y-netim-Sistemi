package Controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseBaglanti {

    // ─── SQL Server Bağlantı Bilgileri ───
    // AWS RDS SQL Server
    private static final String SUNUCU = "fitzonedb.c5ysycmwwuyp.eu-north-1.rds.amazonaws.com";
    private static final String PORT = "1433";
    private static final String VERITABANI = "fitzone";
    private static final String KULLANICI_ADI = "admin"; // SQL Server kullanıcısı
    private static final String SIFRE = "admin1234"; // SQL Server şifresi

    // SQL Authentication (kullanıcı adı + şifre):
    private static final String URL = "jdbc:sqlserver://" + SUNUCU + ":" + PORT
            + ";databaseName=" + VERITABANI
            + ";encrypt=true;trustServerCertificate=true";

    private static Connection baglanti = null;

    // ═══════════════════════════════════════════
    // BAĞLANTI AÇ
    // ═══════════════════════════════════════════
    public static Connection baglantiGetir() {
        try {
            if (baglanti == null || baglanti.isClosed()) {
                // SQL Server JDBC Driver yükle
                Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
                baglanti = DriverManager.getConnection(URL, KULLANICI_ADI, SIFRE);
                System.out.println("✅ SQL Server bağlantısı başarılı!");
            }
        } catch (ClassNotFoundException e) {
            System.out.println("❌ SQL Server JDBC Driver bulunamadı!");
            System.out.println("   → mssql-jdbc JAR dosyasını projeye ekleyin.");
            System.out.println("   → Maven: com.microsoft.sqlserver:mssql-jdbc");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("❌ SQL Server bağlantı hatası!");
            System.out.println("   → URL: " + URL);
            System.out.println("   → Kullanıcı: " + KULLANICI_ADI);
            e.printStackTrace();
        }
        return baglanti;
    }

    // ═══════════════════════════════════════════
    // BAĞLANTI KAPAT
    // ═══════════════════════════════════════════
    public static void baglantiKapat() {
        try {
            if (baglanti != null && !baglanti.isClosed()) {
                baglanti.close();
                baglanti = null;
                System.out.println("✅ SQL Server bağlantısı kapatıldı.");
            }
        } catch (SQLException e) {
            System.out.println("❌ Bağlantı kapatma hatası!");
            e.printStackTrace();
        }
    }

    // ═══════════════════════════════════════════
    // BAĞLANTI TEST
    // ═══════════════════════════════════════════
    public static boolean baglantiTest() {
        Connection conn = baglantiGetir();
        if (conn != null) {
            System.out.println("✅ Veritabanı bağlantı testi başarılı!");
            return true;
        }
        System.out.println("❌ Veritabanı bağlantı testi başarısız!");
        return false;
    }
}
