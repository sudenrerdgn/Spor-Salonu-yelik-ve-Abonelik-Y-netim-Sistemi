// ═══════════════════════════════════════════
// FitZone Pro — app.js
// Sadece Frontend Demo Verileri
// Backend bağlantısı yapılacak
// ═══════════════════════════════════════════

// ─── DEMO VERİLER ───
const planColors = {
  platinum: { class: 'platinum', icon: '💎', price: '₺850', color: '#a78bfa', bg: 'rgba(139,92,246,.15)' },
  gold:     { class: 'gold',     icon: '⭐', price: '₺550', color: '#fbbf24', bg: 'rgba(251,191,36,.15)' },
  silver:   { class: 'silver',   icon: '🥈', price: '₺350', color: '#94a3b8', bg: 'rgba(148,163,184,.15)' },
  basic:    { class: 'basic',    icon: '🔰', price: '₺199', color: '#67e8f9', bg: 'rgba(34,211,238,.1)' }
};

const avatarColors = [
  'linear-gradient(135deg,#8b5cf6,#06b6d4)',
  'linear-gradient(135deg,#f472b6,#8b5cf6)',
  'linear-gradient(135deg,#22d3ee,#6366f1)',
  'linear-gradient(135deg,#fb923c,#f472b6)',
  'linear-gradient(135deg,#4ade80,#06b6d4)',
  'linear-gradient(135deg,#fbbf24,#f472b6)',
];

// ─── ÜYE LİSTESİ (demo) ───
let members = [
  { id:1, name:'Ahmet Yılmaz',   email:'ahmet@mail.com',  uyelikNo:'FZ-2026-001', plan:'platinum', start:'2026-01-15', end:'2027-01-15', payment:'₺850', status:'aktif',        odemeYontemi:'kredi_karti' },
  { id:2, name:'Fatma Kaya',     email:'fatma@mail.com',  uyelikNo:'FZ-2026-002', plan:'gold',     start:'2026-02-01', end:'2026-08-01', payment:'₺550', status:'aktif',        odemeYontemi:'nakit' },
  { id:3, name:'Can Öztürk',     email:'can@mail.com',    uyelikNo:'FZ-2026-003', plan:'silver',   start:'2026-01-01', end:'2026-04-01', payment:'₺350', status:'aktif',        odemeYontemi:'havale' },
  { id:4, name:'Selin Arslan',   email:'selin@mail.com',  uyelikNo:'FZ-2026-004', plan:'platinum', start:'2025-12-01', end:'2026-12-01', payment:'₺850', status:'aktif',        odemeYontemi:'kredi_karti' },
  { id:5, name:'Emre Demir',     email:'emre@mail.com',   uyelikNo:'FZ-2026-005', plan:'basic',    start:'2026-03-01', end:'2026-04-01', payment:'₺199', status:'aktif',        odemeYontemi:'nakit' },
  { id:6, name:'Zeynep Şahin',   email:'zeynep@mail.com', uyelikNo:'FZ-2026-006', plan:'gold',     start:'2025-11-01', end:'2026-02-01', payment:'₺550', status:'suresi_doldu', odemeYontemi:'online' },
  { id:7, name:'Murat Çelik',    email:'murat@mail.com',  uyelikNo:'FZ-2026-007', plan:'silver',   start:'2026-02-15', end:'2026-05-15', payment:'₺350', status:'aktif',        odemeYontemi:'kredi_karti' },
  { id:8, name:'Ayşe Yıldız',    email:'ayse@mail.com',   uyelikNo:'FZ-2026-008', plan:'platinum', start:'2026-01-20', end:'2027-01-20', payment:'₺850', status:'aktif',        odemeYontemi:'kredi_karti' },
];

let filtered = [...members];

// ═══════════════════════════════════════════
// ÜYE TABLOSU
// ═══════════════════════════════════════════

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function renderMembers(data) {
  const tbody = document.getElementById('membersTableBody');
  tbody.innerHTML = '';
  const statusLabel = { aktif:'Aktif', pasif:'Pasif', iptal:'İptal', suresi_doldu:'Süresi Doldu' };
  data.forEach((m, idx) => {
    const p = planColors[m.plan];
    const color = avatarColors[idx % avatarColors.length];
    tbody.innerHTML += `
      <tr>
        <td>
          <div class="member-info">
            <div class="m-avatar" style="background:${color}">${getInitials(m.name)}</div>
            <div>
              <div class="m-name">${m.name}</div>
              <div class="m-email">${m.email}</div>
            </div>
          </div>
        </td>
        <td style="color:var(--text-muted);font-size:12px;font-weight:600">${m.uyelikNo}</td>
        <td><span class="plan-badge ${p.class}">${p.icon} ${m.plan.charAt(0).toUpperCase()+m.plan.slice(1)}</span></td>
        <td style="color:var(--text-muted);font-size:12px">${m.start}</td>
        <td style="color:var(--text-muted);font-size:12px">${m.end}</td>
        <td style="font-family:'Clash Display',sans-serif;font-weight:700;color:#4ade80">${m.payment}</td>
        <td><span class="status-dot ${m.status}">${statusLabel[m.status] || m.status}</span></td>
        <td>
          <div style="display:flex;gap:6px">
            <div class="icon-btn" style="width:30px;height:30px;border-radius:8px;font-size:11px;" title="Düzenle"><i class="fas fa-pen"></i></div>
            <div class="icon-btn" style="width:30px;height:30px;border-radius:8px;font-size:11px;" title="Sil" onclick="deleteMember(${m.id})"><i class="fas fa-trash" style="color:#f87171"></i></div>
          </div>
        </td>
      </tr>`;
  });
  document.getElementById('memberCount').textContent = `${data.length} üye gösteriliyor`;
}

function filterMembers(q) {
  filtered = members.filter(m => m.name.toLowerCase().includes(q.toLowerCase()) || m.email.toLowerCase().includes(q.toLowerCase()));
  const st = document.getElementById('statusFilter').value;
  if (st !== 'hepsi') filtered = filtered.filter(m => m.status === st);
  renderMembers(filtered);
}

function filterByStatus(st) {
  const q = document.getElementById('searchInput').value;
  filtered = members.filter(m => m.name.toLowerCase().includes(q.toLowerCase()) || m.email.toLowerCase().includes(q.toLowerCase()));
  if (st !== 'hepsi') filtered = filtered.filter(m => m.status === st);
  renderMembers(filtered);
}

function deleteMember(id) {
  members = members.filter(m => m.id !== id);
  filterByStatus(document.getElementById('statusFilter').value);
  document.getElementById('totalMembers').textContent = members.length;
  document.getElementById('sidebarMemberCount').textContent = members.length;
  showToast('Üye silindi.');
}

// ═══════════════════════════════════════════
// SON ÖDEMELER
// ═══════════════════════════════════════════
function renderRecentPayments() {
  const container = document.getElementById('recentPayments');
  const payments = [
    { name:'Ahmet Yılmaz',  plan:'Platinum', method:'Kredi Kartı', date:'12 Mar', amount:850,  icon:'fa-crown',       iconColor:'#a78bfa', iconBg:'rgba(139,92,246,.15)', type:'pos' },
    { name:'Fatma Kaya',    plan:'Gold',     method:'Nakit',       date:'11 Mar', amount:550,  icon:'fa-star',        iconColor:'#fbbf24', iconBg:'rgba(251,191,36,.15)', type:'pos' },
    { name:'Can Öztürk',    plan:'Silver',   method:'Havale',      date:'10 Mar', amount:350,  icon:'fa-medal',       iconColor:'#94a3b8', iconBg:'rgba(148,163,184,.15)', type:'pos' },
    { name:'Zeynep Şahin',  plan:'İade',     method:'Online',      date:'10 Mar', amount:550,  icon:'fa-rotate-left', iconColor:'#f87171', iconBg:'rgba(239,68,68,.15)',   type:'neg' },
  ];
  container.innerHTML = '';
  payments.forEach(p => {
    container.innerHTML += `
      <div class="payment-item">
        <div class="pay-icon" style="background:${p.iconBg};color:${p.iconColor}"><i class="fas ${p.icon}"></i></div>
        <div><div class="pay-name">${p.name}</div><div class="pay-date">${p.plan} — ${p.method} — ${p.date}</div></div>
        <div class="pay-amount ${p.type}">${p.type==='neg'?'-':'+'}₺${p.amount}</div>
      </div>`;
  });
}

// ═══════════════════════════════════════════
// ABONELİK PLANLARI
// ═══════════════════════════════════════════
function renderPlanCards() {
  const container = document.getElementById('planCards');
  const plans = [
    { icon:'💎', name:'Platinum', members:3,  sureAy:12, price:'₺850/ay', color:'#a78bfa', bg:'rgba(139,92,246,.15)' },
    { icon:'⭐', name:'Gold',     members:2,  sureAy:6,  price:'₺550/ay', color:'#fbbf24', bg:'rgba(251,191,36,.15)' },
    { icon:'🥈', name:'Silver',   members:2,  sureAy:3,  price:'₺350/ay', color:'#94a3b8', bg:'rgba(148,163,184,.15)' },
    { icon:'🔰', name:'Basic',    members:1,  sureAy:1,  price:'₺199/ay', color:'#67e8f9', bg:'rgba(34,211,238,.1)' },
  ];
  container.innerHTML = '<div style="display:flex;flex-direction:column;gap:10px;">';
  plans.forEach(p => {
    container.innerHTML += `
      <div class="plan-card">
        <div class="plan-left">
          <div class="plan-icon" style="background:${p.bg};color:${p.color};font-size:18px;">${p.icon}</div>
          <div><div class="plan-name">${p.name}</div><div class="plan-members">${p.members} aktif üye · ${p.sureAy} ay</div></div>
        </div>
        <div class="plan-price" style="color:${p.color}">${p.price}</div>
      </div>`;
  });
  container.innerHTML += '</div>';
}

// ═══════════════════════════════════════════
// BUGÜNKÜ DERSLER (siniflar + sinif_programlari)
// ═══════════════════════════════════════════
function renderClassCards() {
  const container = document.getElementById('classCards');
  const classes = [
    { icon:'🧘', name:'Yoga Flow',           time:'08:00–09:00', salon:'Salon A', trainer:'Deniz Koç',      capacity:'12/15', status:'Açık', statusColor:'var(--accent-cyan)', statusBg:'rgba(0,212,255,.1)' },
    { icon:'🥊', name:'Kickboks',            time:'10:00–11:00', salon:'Salon B', trainer:'Kemal Antrenör', capacity:'18/20', status:'Dolu', statusColor:'var(--accent-orange)', statusBg:'rgba(251,146,60,.1)' },
    { icon:'🏊', name:'Aqua Aerobik',        time:'14:00–14:45', salon:'Havuz',   trainer:'Deniz Koç',      capacity:'8/15',  status:'Açık', statusColor:'#4ade80', statusBg:'rgba(74,222,128,.1)' },
    { icon:'🏋️', name:'Fonksiyonel Fitness', time:'18:00–19:00', salon:'Salon C', trainer:'Kemal Antrenör', capacity:'15/20', status:'Açık', statusColor:'var(--accent-cyan)', statusBg:'rgba(0,212,255,.1)' },
  ];
  container.innerHTML = '<div style="display:flex;flex-direction:column;gap:10px;">';
  classes.forEach(c => {
    container.innerHTML += `
      <div class="plan-card">
        <div class="plan-left">
          <div class="plan-icon" style="background:rgba(0,212,255,.1);color:var(--accent-cyan);font-size:17px;">${c.icon}</div>
          <div><div class="plan-name">${c.name}</div><div class="plan-members">${c.time} — ${c.salon} — ${c.trainer} — ${c.capacity}</div></div>
        </div>
        <div style="font-size:11px;background:${c.statusBg};color:${c.statusColor};padding:4px 10px;border-radius:20px;font-weight:600;">${c.status}</div>
      </div>`;
  });
  container.innerHTML += '</div>';
}

// ═══════════════════════════════════════════
// ANTRENÖRLER
// ═══════════════════════════════════════════
function renderTrainerCards() {
  const container = document.getElementById('trainerCards');
  const trainers = [
    { name:'Kemal Antrenör', uzmanlik:'Fonksiyonel Fitness, Crossfit', deneyim:8, sertifika:'ACE CPT, CSCS',         dersCount:2, durum:'aktif' },
    { name:'Deniz Koç',      uzmanlik:'Yoga, Pilates, Aqua Aerobik',  deneyim:5, sertifika:'RYT-200, STOTT Pilates', dersCount:3, durum:'aktif' },
  ];
  container.innerHTML = '<div style="display:flex;flex-direction:column;gap:10px;">';
  trainers.forEach((t, idx) => {
    const color = avatarColors[idx % avatarColors.length];
    container.innerHTML += `
      <div class="plan-card">
        <div class="plan-left">
          <div class="m-avatar" style="background:${color};width:38px;height:38px;border-radius:10px;display:grid;place-items:center;font-size:13px;font-weight:700;flex-shrink:0;">${getInitials(t.name)}</div>
          <div>
            <div class="plan-name">${t.name}</div>
            <div class="plan-members">${t.uzmanlik}</div>
            <div class="plan-members">${t.deneyim} yıl · ${t.dersCount} ders · ${t.sertifika}</div>
          </div>
        </div>
        <div style="font-size:11px;background:rgba(74,222,128,.1);color:#4ade80;padding:4px 10px;border-radius:20px;font-weight:600;">Aktif</div>
      </div>`;
  });
  container.innerHTML += '</div>';
}

// ═══════════════════════════════════════════
// GİRİŞ / ÇIKIŞ KAYITLARI
// ═══════════════════════════════════════════
function renderAccessLogs() {
  const container = document.getElementById('accessLogs');
  const turuLabel = { normal:'Normal', qr:'QR Kod', kart:'Kart' };
  const turuIcon  = { normal:'fa-door-open', qr:'fa-qrcode', kart:'fa-id-badge' };
  const logs = [
    { name:'Ahmet Yılmaz',  giris:'07:30', cikis:'09:15', turu:'kart',   isInside:false },
    { name:'Fatma Kaya',    giris:'08:00', cikis:null,     turu:'qr',     isInside:true },
    { name:'Can Öztürk',    giris:'06:00', cikis:'08:00', turu:'normal', isInside:false },
    { name:'Selin Arslan',  giris:'09:30', cikis:null,     turu:'kart',   isInside:true },
  ];
  container.innerHTML = '<div style="display:flex;flex-direction:column;gap:10px;">';
  logs.forEach(l => {
    container.innerHTML += `
      <div class="plan-card">
        <div class="plan-left">
          <div class="plan-icon" style="background:${l.isInside?'rgba(74,222,128,.1)':'rgba(148,163,184,.1)'};color:${l.isInside?'#4ade80':'#94a3b8'};font-size:16px;"><i class="fas ${turuIcon[l.turu]}"></i></div>
          <div>
            <div class="plan-name">${l.name}</div>
            <div class="plan-members">Giriş: ${l.giris} · Çıkış: ${l.cikis||'İçeride'} · ${turuLabel[l.turu]}</div>
          </div>
        </div>
        <div style="font-size:11px;background:${l.isInside?'rgba(74,222,128,.1)':'rgba(148,163,184,.1)'};color:${l.isInside?'#4ade80':'#94a3b8'};padding:4px 10px;border-radius:20px;font-weight:600;">${l.isInside?'İçeride':'Çıktı'}</div>
      </div>`;
  });
  container.innerHTML += '</div>';
}

// ═══════════════════════════════════════════
// EKİPMAN DURUMU (ekipman + ekipman_bakimi)
// ═══════════════════════════════════════════
function renderEquipmentCards() {
  const container = document.getElementById('equipmentCards');
  const durumStyle = {
    calisiyor: { text:'Çalışıyor', color:'#4ade80', bg:'rgba(74,222,128,.1)' },
    bakimda:   { text:'Bakımda',   color:'#fbbf24', bg:'rgba(251,191,36,.1)' },
    arizali:   { text:'Arızalı',   color:'#f87171', bg:'rgba(239,68,68,.1)' }
  };
  const categoryIcons = { 'Kardio':'🏃', 'Güç':'💪', 'Esneklik':'🧘' };
  const equipment = [
    { name:'Koşu Bandı',           kategori:'Kardio',    adet:8,  durum:'calisiyor', sonBakim:'2026-02-20' },
    { name:'Eliptik Bisiklet',     kategori:'Kardio',    adet:4,  durum:'calisiyor', sonBakim:null },
    { name:'Ağırlık Sehpası',      kategori:'Güç',       adet:10, durum:'calisiyor', sonBakim:null },
    { name:'Dumbbell Seti',        kategori:'Güç',       adet:5,  durum:'calisiyor', sonBakim:null },
    { name:'Kürek Çekme Makinesi', kategori:'Kardio',    adet:2,  durum:'bakimda',   sonBakim:'2026-03-10' },
    { name:'Smith Machine',        kategori:'Güç',       adet:2,  durum:'calisiyor', sonBakim:null },
    { name:'Yoga Matı',            kategori:'Esneklik',  adet:20, durum:'calisiyor', sonBakim:null },
  ];
  container.innerHTML = '<div class="ekipman-grid-layout">';
  equipment.forEach(e => {
    const d = durumStyle[e.durum];
    const icon = categoryIcons[e.kategori] || '🔧';
    container.innerHTML += `
      <div class="plan-card">
        <div class="plan-left">
          <div class="plan-icon" style="background:${d.bg};color:${d.color};font-size:17px;">${icon}</div>
          <div>
            <div class="plan-name">${e.name}</div>
            <div class="plan-members">${e.kategori} · ${e.adet} adet${e.sonBakim ? ' · Son bakım: '+e.sonBakim : ''}</div>
          </div>
        </div>
        <div style="font-size:11px;background:${d.bg};color:${d.color};padding:4px 10px;border-radius:20px;font-weight:600;">${d.text}</div>
      </div>`;
  });
  container.innerHTML += '</div>';
}

// ═══════════════════════════════════════════
// MODAL
// ═══════════════════════════════════════════
function openModal() {
  document.getElementById('modalOverlay').classList.add('open');
  document.getElementById('fDate').value = new Date().toISOString().split('T')[0];
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

function addMember() {
  const name = `${document.getElementById('fName').value.trim()} ${document.getElementById('fSurname').value.trim()}`.trim();
  const email = document.getElementById('fEmail').value.trim();
  const plan = document.getElementById('fPlan').value;
  const start = document.getElementById('fDate').value;
  if (!name || name === '' || !email || !start) { showToast('Lütfen zorunlu alanları doldurun!'); return; }

  const planMap = { '4':'platinum', '3':'gold', '2':'silver', '1':'basic' };
  const planKey = planMap[plan] || 'basic';
  const p = planColors[planKey];

  const endDate = new Date(start);
  const sureMap = { '4':12, '3':6, '2':3, '1':1 };
  endDate.setMonth(endDate.getMonth() + (sureMap[plan] || 1));

  const newId = Date.now();
  const uyelikNo = `FZ-2026-${String(members.length + 1).padStart(3, '0')}`;

  members.unshift({
    id: newId, name, email, uyelikNo,
    plan: planKey, start,
    end: endDate.toISOString().split('T')[0],
    payment: p.price, status: 'aktif',
    odemeYontemi: document.getElementById('fPayMethod').value
  });

  filterByStatus(document.getElementById('statusFilter').value);
  document.getElementById('totalMembers').textContent = members.length;
  document.getElementById('sidebarMemberCount').textContent = members.length;
  closeModal();
  showToast(`${name} başarıyla eklendi! ✓`);
  ['fName','fSurname','fEmail','fPhone','fEmergency','fHealthNote'].forEach(id => document.getElementById(id).value = '');
}

// ═══════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ═══════════════════════════════════════════
// GRAFİK
// ═══════════════════════════════════════════
const chartData = {
  gelir: {
    labels: ['Eyl','Eki','Kas','Ara','Oca','Şub','Mar'],
    data: [32000, 37000, 41000, 38000, 43000, 45000, 47200],
    color1: 'rgba(139,92,246,0.8)', color2: 'rgba(0,212,255,0.2)',
    label: 'Aylık Gelir (₺)'
  },
  uye: {
    labels: ['Eyl','Eki','Kas','Ara','Oca','Şub','Mar'],
    data: [180, 195, 210, 205, 228, 238, 248],
    color1: 'rgba(0,212,255,0.8)', color2: 'rgba(139,92,246,0.2)',
    label: 'Toplam Üye'
  },
  devamsiz: {
    labels: ['Eyl','Eki','Kas','Ara','Oca','Şub','Mar'],
    data: [8, 12, 9, 15, 11, 13, 12],
    color1: 'rgba(244,114,182,0.8)', color2: 'rgba(251,146,60,0.2)',
    label: 'Devamsız Üye'
  }
};

let chart;

function initChart(type = 'gelir') {
  const ctx = document.getElementById('mainChart').getContext('2d');
  const d = chartData[type];
  const grad = ctx.createLinearGradient(0, 0, 0, 220);
  grad.addColorStop(0, d.color1.replace('0.8','0.3'));
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: [{
        label: d.label, data: d.data,
        borderColor: d.color1, backgroundColor: grad,
        borderWidth: 2.5, pointBackgroundColor: d.color1,
        pointBorderColor: '#fff', pointBorderWidth: 2,
        pointRadius: 5, pointHoverRadius: 7,
        fill: true, tension: 0.45,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(15,20,40,0.95)',
          borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1,
          titleColor: '#f0f4ff', bodyColor: '#94a3b8',
          padding: 12, cornerRadius: 10
        }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: 'rgba(200,210,255,0.5)', font: { size: 11 } }, border: { display: false } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: 'rgba(200,210,255,0.5)', font: { size: 11 } }, border: { display: false } }
      }
    }
  });
}

function switchChart(type, el) {
  document.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  initChart(type);
}

// ═══════════════════════════════════════════
// INIT — SAYFA YÜKLENINCE
// ═══════════════════════════════════════════
function updateDateTime() {
  const el = document.getElementById('currentDateTime');
  if (!el) return;
  const now = new Date();
  const gunler = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const aylar = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  const gunStr = gunler[now.getDay()];
  const ayStr = aylar[now.getMonth()];
  const gun = now.getDate();
  const yil = now.getFullYear();
  const saat = String(now.getHours()).padStart(2, '0');
  const dakika = String(now.getMinutes()).padStart(2, '0');
  
  el.innerHTML = `Bugün, ${gun} ${ayStr} ${yil} — ${gunStr} <span style="margin-left:10px;color:var(--accent-cyan);font-weight:600;"><i class="far fa-clock"></i> ${saat}:${dakika}</span>`;
}

function initApp() {
  renderMembers(members);
  renderRecentPayments();
  renderPlanCards();
  renderClassCards();
  renderTrainerCards();
  renderAccessLogs();
  renderEquipmentCards();
  initChart();
  updateDateTime();
  setInterval(updateDateTime, 1000);
}

// ═══════════════════════════════════════════
// SPA NAVİGASYON
// ═══════════════════════════════════════════
let currentPage = 'dashboard';
let raporCharts = {};

function navigateTo(page, navEl) {
  if (page === currentPage) return;
  event && event.preventDefault();
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const section = document.getElementById('page-' + page);
  if (section) { section.classList.add('active'); }
  if (navEl) navEl.classList.add('active');
  currentPage = page;
  window.scrollTo(0, 0);
  // Lazy render
  const renderers = {
    'uyeler': renderUyelerPage,
    'abonelikler': renderAboneliklerPage,
    'odemeler': renderOdemelerPage,
    'dersler': renderDerslerPage,
    'antrenorler': renderAntrenorlerPage,
    'giris-cikis': renderGirisCikisPage,
    'ekipman': renderEkipmanPage,
    'raporlar': renderRaporlarPage,
    'ayarlar': renderAyarlarPage,
  };
  if (renderers[page]) renderers[page]();
}

// ═══════════════════════════════════════════
// ÜYELER SAYFASI
// ═══════════════════════════════════════════
const uyelerData = [
  { id:1, name:'Ahmet Yılmaz',  email:'ahmet@mail.com',  uyelikNo:'FZ-2026-001', telefon:'0532 111 11 11', cinsiyet:'Erkek', plan:'platinum', status:'aktif',        kayitTarihi:'2026-01-15' },
  { id:2, name:'Fatma Kaya',    email:'fatma@mail.com',  uyelikNo:'FZ-2026-002', telefon:'0533 222 22 22', cinsiyet:'Kadın', plan:'gold',     status:'aktif',        kayitTarihi:'2026-02-01' },
  { id:3, name:'Can Öztürk',    email:'can@mail.com',    uyelikNo:'FZ-2026-003', telefon:'0534 333 33 33', cinsiyet:'Erkek', plan:'silver',   status:'aktif',        kayitTarihi:'2026-01-01' },
  { id:4, name:'Selin Arslan',  email:'selin@mail.com',  uyelikNo:'FZ-2026-004', telefon:'0535 444 44 44', cinsiyet:'Kadın', plan:'platinum', status:'aktif',        kayitTarihi:'2025-12-01' },
  { id:5, name:'Emre Demir',    email:'emre@mail.com',   uyelikNo:'FZ-2026-005', telefon:'0536 555 55 55', cinsiyet:'Erkek', plan:'basic',    status:'aktif',        kayitTarihi:'2026-03-01' },
  { id:6, name:'Zeynep Şahin',  email:'zeynep@mail.com', uyelikNo:'FZ-2026-006', telefon:'0537 666 66 66', cinsiyet:'Kadın', plan:'gold',     status:'suresi_doldu', kayitTarihi:'2025-11-01' },
  { id:7, name:'Murat Çelik',   email:'murat@mail.com',  uyelikNo:'FZ-2026-007', telefon:'0538 777 77 77', cinsiyet:'Erkek', plan:'silver',   status:'aktif',        kayitTarihi:'2026-02-15' },
  { id:8, name:'Ayşe Yıldız',   email:'ayse@mail.com',   uyelikNo:'FZ-2026-008', telefon:'0539 888 88 88', cinsiyet:'Kadın', plan:'platinum', status:'aktif',        kayitTarihi:'2026-01-20' },
];

function renderUyelerPage(data) {
  const list = data || uyelerData;
  const tbody = document.getElementById('uyelerTableBody');
  if (!tbody) return;
  const statusLabel = { aktif:'Aktif', pasif:'Pasif', suresi_doldu:'Süresi Doldu' };
  tbody.innerHTML = '';
  list.forEach((m, idx) => {
    const p = planColors[m.plan];
    const color = avatarColors[idx % avatarColors.length];
    tbody.innerHTML += `<tr>
      <td><div class="member-info"><div class="m-avatar" style="background:${color}">${getInitials(m.name)}</div><div><div class="m-name">${m.name}</div><div class="m-email">${m.email}</div></div></div></td>
      <td style="color:var(--text-muted);font-size:12px;font-weight:600">${m.uyelikNo}</td>
      <td style="color:var(--text-muted);font-size:12px">${m.telefon}</td>
      <td style="color:var(--text-muted);font-size:12px">${m.cinsiyet}</td>
      <td><span class="plan-badge ${p.class}">${p.icon} ${m.plan.charAt(0).toUpperCase()+m.plan.slice(1)}</span></td>
      <td><span class="status-dot ${m.status}">${statusLabel[m.status]||m.status}</span></td>
      <td style="color:var(--text-muted);font-size:12px">${m.kayitTarihi}</td>
      <td><div style="display:flex;gap:6px"><div class="icon-btn" style="width:30px;height:30px;border-radius:8px;font-size:11px;" title="Düzenle"><i class="fas fa-pen"></i></div><div class="icon-btn" style="width:30px;height:30px;border-radius:8px;font-size:11px;" title="Sil"><i class="fas fa-trash" style="color:#f87171"></i></div></div></td></tr>`;
  });
}

function filterUyelerPage(q) {
  let f = uyelerData.filter(m => m.name.toLowerCase().includes(q.toLowerCase()) || m.email.toLowerCase().includes(q.toLowerCase()));
  const st = document.getElementById('uyelerStatusFilter')?.value;
  if (st && st !== 'hepsi') f = f.filter(m => m.status === st);
  renderUyelerPage(f);
}

// ═══════════════════════════════════════════
// ABONELİKLER SAYFASI
// ═══════════════════════════════════════════
const aboneliklerData = [
  { uye:'Ahmet Yılmaz',  plan:'Platinum', baslangic:'2026-01-15', bitis:'2027-01-15', otomatik:true,  durum:'aktif' },
  { uye:'Fatma Kaya',    plan:'Gold',     baslangic:'2026-02-01', bitis:'2026-08-01', otomatik:false, durum:'aktif' },
  { uye:'Can Öztürk',    plan:'Silver',   baslangic:'2026-01-01', bitis:'2026-04-01', otomatik:false, durum:'aktif' },
  { uye:'Selin Arslan',  plan:'Platinum', baslangic:'2025-12-01', bitis:'2026-12-01', otomatik:true,  durum:'aktif' },
  { uye:'Emre Demir',    plan:'Basic',    baslangic:'2026-03-01', bitis:'2026-04-01', otomatik:false, durum:'aktif' },
  { uye:'Zeynep Şahin',  plan:'Gold',     baslangic:'2025-11-01', bitis:'2026-02-01', otomatik:false, durum:'suresi_doldu' },
  { uye:'Murat Çelik',   plan:'Silver',   baslangic:'2026-02-15', bitis:'2026-05-15', otomatik:true,  durum:'aktif' },
  { uye:'Ayşe Yıldız',   plan:'Platinum', baslangic:'2026-01-20', bitis:'2027-01-20', otomatik:true,  durum:'aktif' },
];

let planChartInstance = null;
function renderAboneliklerPage() {
  // Plan cards
  const planContainer = document.getElementById('abonelikPlanCards');
  if (!planContainer) return;
  const plans = [
    { icon:'💎', name:'Platinum', members:3, sureAy:12, price:'₺850/ay', color:'#a78bfa', bg:'rgba(139,92,246,.15)', ozellikler:['Fitness alanı','Sınırsız her şey','3 PT seansı/ay','Havuz & Sauna','Öncelikli rezervasyon'] },
    { icon:'⭐', name:'Gold',     members:2, sureAy:6,  price:'₺550/ay', color:'#fbbf24', bg:'rgba(251,191,36,.15)', ozellikler:['Fitness alanı','Sınırsız grup dersi','1 PT seansı/ay','Havuz'] },
    { icon:'🥈', name:'Silver',   members:2, sureAy:3,  price:'₺350/ay', color:'#94a3b8', bg:'rgba(148,163,184,.15)', ozellikler:['Fitness alanı','2 grup dersi/hafta','Duş & soyunma'] },
    { icon:'🔰', name:'Basic',    members:1, sureAy:1,  price:'₺199/ay', color:'#67e8f9', bg:'rgba(34,211,238,.1)', ozellikler:['Fitness alanı','Duş & soyunma'] },
  ];
  planContainer.innerHTML = '<div style="display:flex;flex-direction:column;gap:10px;">';
  plans.forEach(p => {
    planContainer.innerHTML += `<div class="plan-card"><div class="plan-left"><div class="plan-icon" style="background:${p.bg};color:${p.color};font-size:18px;">${p.icon}</div><div><div class="plan-name">${p.name}</div><div class="plan-members">${p.members} aktif üye · ${p.sureAy} ay · ${p.ozellikler.join(', ')}</div></div></div><div class="plan-price" style="color:${p.color}">${p.price}</div></div>`;
  });
  planContainer.innerHTML += '</div>';

  // Plan chart
  const ctx = document.getElementById('planChart');
  if (ctx) {
    if (planChartInstance) planChartInstance.destroy();
    planChartInstance = new Chart(ctx.getContext('2d'), {
      type:'doughnut',
      data:{ labels:['Platinum','Gold','Silver','Basic'], datasets:[{ data:[3,2,2,1], backgroundColor:['#a78bfa','#fbbf24','#94a3b8','#67e8f9'], borderWidth:0 }] },
      options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'bottom', labels:{ color:'rgba(200,210,255,0.7)', padding:16, font:{size:12} } } } }
    });
  }

  // Abonelik tablosu
  const tbody = document.getElementById('aboneliklerTableBody');
  if (!tbody) return;
  const durumLabel = { aktif:'Aktif', pasif:'Pasif', iptal:'İptal', suresi_doldu:'Süresi Doldu' };
  tbody.innerHTML = '';
  // Üye rolünde sadece kendi aboneliğini göster
  const currentProfile = roleProfiles[currentRole];
  const filteredAbonelikler = currentRole === 'uye'
    ? aboneliklerData.filter(a => a.uye === currentProfile.name)
    : aboneliklerData;
  filteredAbonelikler.forEach((a, idx) => {
    const color = avatarColors[idx % avatarColors.length];
    const pKey = a.plan.toLowerCase();
    const p = planColors[pKey] || planColors.basic;
    tbody.innerHTML += `<tr>
      <td><div class="member-info"><div class="m-avatar" style="background:${color}">${getInitials(a.uye)}</div><div class="m-name">${a.uye}</div></div></td>
      <td><span class="plan-badge ${p.class}">${p.icon} ${a.plan}</span></td>
      <td style="color:var(--text-muted);font-size:12px">${a.baslangic}</td>
      <td style="color:var(--text-muted);font-size:12px">${a.bitis}</td>
      <td style="text-align:center"><i class="fas ${a.otomatik?'fa-check-circle':'fa-times-circle'}" style="color:${a.otomatik?'#4ade80':'#f87171'}"></i></td>
      <td><span class="status-dot ${a.durum}">${durumLabel[a.durum]}</span></td>
      <td><div style="display:flex;gap:6px"><div class="icon-btn" style="width:30px;height:30px;border-radius:8px;font-size:11px;"><i class="fas fa-pen"></i></div><div class="icon-btn" style="width:30px;height:30px;border-radius:8px;font-size:11px;"><i class="fas fa-clock-rotate-left" style="color:#fbbf24"></i></div></div></td></tr>`;
  });
}

// ═══════════════════════════════════════════
// ÖDEMELER SAYFASI
// ═══════════════════════════════════════════
const odemelerData = [
  { uye:'Ahmet Yılmaz',  plan:'Platinum', miktar:850,  yontem:'Kredi Kartı', tarih:'2026-03-12', durum:'tamamlandi' },
  { uye:'Fatma Kaya',    plan:'Gold',     miktar:550,  yontem:'Nakit',       tarih:'2026-03-11', durum:'tamamlandi' },
  { uye:'Can Öztürk',    plan:'Silver',   miktar:350,  yontem:'Havale',      tarih:'2026-03-10', durum:'tamamlandi' },
  { uye:'Selin Arslan',  plan:'Platinum', miktar:850,  yontem:'Kredi Kartı', tarih:'2026-03-08', durum:'tamamlandi' },
  { uye:'Emre Demir',    plan:'Basic',    miktar:199,  yontem:'Nakit',       tarih:'2026-03-01', durum:'tamamlandi' },
  { uye:'Zeynep Şahin',  plan:'Gold',     miktar:550,  yontem:'Online',      tarih:'2026-02-28', durum:'iade' },
  { uye:'Murat Çelik',   plan:'Silver',   miktar:350,  yontem:'Kredi Kartı', tarih:'2026-02-15', durum:'tamamlandi' },
  { uye:'Ayşe Yıldız',   plan:'Platinum', miktar:850,  yontem:'Kredi Kartı', tarih:'2026-01-20', durum:'tamamlandi' },
];

function renderOdemelerTable(data) {
  const tbody = document.getElementById('odemelerTableBody');
  if (!tbody) return;
  const durumLabel = { tamamlandi:'Tamamlandı', beklemede:'Beklemede', basarisiz:'Başarısız', iade:'İade' };
  const durumColor = { tamamlandi:'#4ade80', beklemede:'#fbbf24', basarisiz:'#f87171', iade:'#fb923c' };
  tbody.innerHTML = '';
  data.forEach((o, idx) => {
    const color = avatarColors[idx % avatarColors.length];
    tbody.innerHTML += `<tr>
      <td><div class="member-info"><div class="m-avatar" style="background:${color}">${getInitials(o.uye)}</div><div class="m-name">${o.uye}</div></div></td>
      <td style="color:var(--text-muted);font-size:12px">${o.plan}</td>
      <td style="font-family:'Clash Display',sans-serif;font-weight:700;color:${o.durum==='iade'?'#f87171':'#4ade80'}">${o.durum==='iade'?'-':''}₺${o.miktar}</td>
      <td style="color:var(--text-muted);font-size:12px">${o.yontem}</td>
      <td style="color:var(--text-muted);font-size:12px">${o.tarih}</td>
      <td><span style="font-size:11px;background:${durumColor[o.durum]}20;color:${durumColor[o.durum]};padding:4px 10px;border-radius:20px;font-weight:600;">${durumLabel[o.durum]}</span></td></tr>`;
  });
}

function renderOdemelerPage() {
  // Üye rolünde sadece kendi ödemelerini göster
  const currentProfile = roleProfiles[currentRole];
  const veri = currentRole === 'uye'
    ? odemelerData.filter(o => o.uye === currentProfile.name)
    : odemelerData;
  renderOdemelerTable(veri);
  // İstatistik kartlarını güncelle
  const toplamGelir = veri.filter(o => o.durum !== 'iade').reduce((s, o) => s + o.miktar, 0);
  const toplamIslem = veri.length;
  const tamamlanan  = veri.filter(o => o.durum === 'tamamlandi').length;
  const iade        = veri.filter(o => o.durum === 'iade').length;
  const elToplam    = document.getElementById('odemeToplam');
  const elIslem     = document.getElementById('odemeTotalIslem');
  const elTam       = document.getElementById('odemeTamamlanan');
  const elIade      = document.getElementById('odemeIade');
  if (elToplam) elToplam.textContent = '₺' + toplamGelir.toLocaleString('tr-TR');
  if (elIslem)  elIslem.textContent  = toplamIslem;
  if (elTam)    elTam.textContent    = tamamlanan;
  if (elIade)   elIade.textContent   = iade;
}
function filterOdemeler(st) {
  const currentProfile = roleProfiles[currentRole];
  let veri = currentRole === 'uye'
    ? odemelerData.filter(o => o.uye === currentProfile.name)
    : odemelerData;
  renderOdemelerTable(st === 'hepsi' ? veri : veri.filter(o => o.durum === st));
}

// ═══════════════════════════════════════════
// DERSLER SAYFASI
// ═══════════════════════════════════════════
const derslerDemoData = [
  { ders:'Yoga Flow',           antrenor:'Deniz Koç',      kategori:'Esneklik', kontenjan:15, sure:60, durum:'aktif', icon:'🧘' },
  { ders:'Kickboks',            antrenor:'Kemal Antrenör', kategori:'Kardio',   kontenjan:20, sure:60, durum:'aktif', icon:'🥊' },
  { ders:'Aqua Aerobik',        antrenor:'Deniz Koç',      kategori:'Kardio',   kontenjan:15, sure:45, durum:'aktif', icon:'🏊' },
  { ders:'Fonksiyonel Fitness', antrenor:'Kemal Antrenör', kategori:'Güç',      kontenjan:20, sure:60, durum:'aktif', icon:'🏋️' },
  { ders:'Pilates',             antrenor:'Deniz Koç',      kategori:'Esneklik', kontenjan:12, sure:50, durum:'aktif', icon:'🤸' },
];
const programData = [
  { gun:'Pazartesi',  ders:'Yoga Flow',           saat:'08:00–09:00', salon:'Salon A', durum:'aktif' },
  { gun:'Pazartesi',  ders:'Kickboks',            saat:'10:00–11:00', salon:'Salon B', durum:'aktif' },
  { gun:'Salı',       ders:'Aqua Aerobik',        saat:'14:00–14:45', salon:'Havuz',   durum:'aktif' },
  { gun:'Çarşamba',   ders:'Fonksiyonel Fitness', saat:'18:00–19:00', salon:'Salon C', durum:'aktif' },
  { gun:'Perşembe',   ders:'Pilates',             saat:'09:00–09:50', salon:'Salon A', durum:'aktif' },
  { gun:'Cuma',       ders:'Yoga Flow',           saat:'08:00–09:00', salon:'Salon A', durum:'aktif' },
  { gun:'Cumartesi',  ders:'Kickboks',            saat:'10:00–11:00', salon:'Salon B', durum:'aktif' },
];
const rezervasyonData = [
  { uye:'Ahmet Yılmaz',  ders:'Yoga Flow',           tarih:'2026-03-10', saat:'08:00–09:00', durum:'tamamlandi' },
  { uye:'Fatma Kaya',    ders:'Kickboks',            tarih:'2026-03-10', saat:'10:00–11:00', durum:'aktif' },
  { uye:'Can Öztürk',    ders:'Aqua Aerobik',        tarih:'2026-03-11', saat:'14:00–14:45', durum:'aktif' },
  { uye:'Ahmet Yılmaz',  ders:'Fonksiyonel Fitness', tarih:'2026-03-12', saat:'18:00–19:00', durum:'aktif' },
  { uye:'Selin Arslan',  ders:'Pilates',             tarih:'2026-03-13', saat:'09:00–09:50', durum:'aktif' },
  { uye:'Emre Demir',    ders:'Yoga Flow',           tarih:'2026-03-14', saat:'08:00–09:00', durum:'aktif' },
];

function renderDerslerPage() {
  const dTb = document.getElementById('derslerTableBody');
  if (dTb) { dTb.innerHTML = ''; derslerDemoData.forEach(d => {
    dTb.innerHTML += `<tr><td><div style="display:flex;align-items:center;gap:10px"><span style="font-size:18px">${d.icon}</span><span class="m-name">${d.ders}</span></div></td><td style="color:var(--text-muted);font-size:12px">${d.antrenor}</td><td style="color:var(--text-muted);font-size:12px">${d.kategori}</td><td style="color:var(--text-muted);font-size:12px">${d.kontenjan} kişi</td><td style="color:var(--text-muted);font-size:12px">${d.sure} dk</td><td><span class="status-dot aktif">Aktif</span></td></tr>`;
  });}
  const pTb = document.getElementById('programTableBody');
  if (pTb) { pTb.innerHTML = ''; programData.forEach(p => {
    pTb.innerHTML += `<tr><td style="font-weight:600;font-size:13px">${p.gun}</td><td style="color:var(--text-muted);font-size:12px">${p.ders}</td><td style="color:var(--text-muted);font-size:12px">${p.saat}</td><td style="color:var(--text-muted);font-size:12px">${p.salon}</td><td><span class="status-dot aktif">Aktif</span></td></tr>`;
  });}
  const rTb = document.getElementById('rezervasyonTableBody');
  const rDurum = { aktif:'Aktif', iptal:'İptal', tamamlandi:'Tamamlandı' };
  // Üye rolünde ÜYE sütununu gizle, sadece kendi rezervasyonlarını göster
  const isUye = currentRole === 'uye';
  const currentProfile = roleProfiles[currentRole];
  const uyeSutunu = document.getElementById('rezervasyonUyeTh');
  if (uyeSutunu) uyeSutunu.style.display = isUye ? 'none' : '';
  let filteredRezervasyonlar = isUye
    ? rezervasyonData.filter(r => r.uye === currentProfile.name)
    : rezervasyonData;
  if (rTb) { rTb.innerHTML = ''; filteredRezervasyonlar.forEach((r, idx) => {
    const color = avatarColors[idx % avatarColors.length];
    const uyeCell = isUye ? '' : `<td><div class="member-info"><div class="m-avatar" style="background:${color};width:30px;height:30px;font-size:11px;border-radius:8px">${getInitials(r.uye)}</div><div class="m-name">${r.uye}</div></div></td>`;
    rTb.innerHTML += `<tr>${uyeCell}<td style="color:var(--text-muted);font-size:12px">${r.ders}</td><td style="color:var(--text-muted);font-size:12px">${r.tarih}</td><td style="color:var(--text-muted);font-size:12px">${r.saat}</td><td><span class="status-dot ${r.durum}">${rDurum[r.durum]}</span></td></tr>`;
  });}
}

// ═══════════════════════════════════════════
// ANTRENÖRLER SAYFASI
// ═══════════════════════════════════════════
function renderAntrenorlerPage() {
  const container = document.getElementById('antrenorProfileCards');
  if (!container) return;
  const trainers = [
    { name:'Kemal Antrenör', email:'kemal@fitzone.com', uzmanlik:'Fonksiyonel Fitness, Crossfit', deneyim:8, sertifikalar:['ACE CPT','CSCS'], bio:'8 yıllık deneyimli antrenör. Fonksiyonel fitness ve crossfit alanında uzman. Yüksek yoğunluklu antrenman programları hazırlar.', dersler:['Kickboks','Fonksiyonel Fitness'], dersCount:2, ogrenciCount:40, durum:'aktif' },
    { name:'Deniz Koç',      email:'deniz@fitzone.com', uzmanlik:'Yoga, Pilates, Aqua Aerobik',  deneyim:5, sertifikalar:['RYT-200','STOTT Pilates'], bio:'5 yıldır yoga ve pilates eğitmeni. Sakin ve odaklanmış bir antrenman ortamı sunar. Aqua aerobik konusunda da deneyimlidir.', dersler:['Yoga Flow','Aqua Aerobik','Pilates'], dersCount:3, ogrenciCount:42, durum:'aktif' },
  ];
  container.innerHTML = '';
  trainers.forEach((t, idx) => {
    const color = avatarColors[idx % avatarColors.length];
    const certs = t.sertifikalar.map(c => `<span class="cert-badge"><i class="fas fa-certificate" style="font-size:9px"></i> ${c}</span>`).join('');
    const dersler = t.dersler.map(d => `<span class="cert-badge" style="background:rgba(0,212,255,.1);color:var(--accent-cyan);border-color:rgba(0,212,255,.2)"><i class="fas fa-dumbbell" style="font-size:9px"></i> ${d}</span>`).join('');
    container.innerHTML += `
      <div class="trainer-profile-card">
        <div class="trainer-header">
          <div class="trainer-avatar" style="background:${color}">${getInitials(t.name)}</div>
          <div><div class="trainer-name">${t.name}</div><div class="trainer-specialty">${t.uzmanlik}</div></div>
          <div style="margin-left:auto;font-size:11px;background:rgba(74,222,128,.1);color:#4ade80;padding:4px 10px;border-radius:20px;font-weight:600;">Aktif</div>
        </div>
        <div class="trainer-stats">
          <div class="trainer-stat"><div class="trainer-stat-value">${t.deneyim}</div><div class="trainer-stat-label">Yıl Deneyim</div></div>
          <div class="trainer-stat"><div class="trainer-stat-value">${t.dersCount}</div><div class="trainer-stat-label">Aktif Ders</div></div>
          <div class="trainer-stat"><div class="trainer-stat-value">${t.ogrenciCount}</div><div class="trainer-stat-label">Öğrenci</div></div>
        </div>
        <div style="margin-bottom:10px;"><div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;">Sertifikalar</div><div class="trainer-certs">${certs}</div></div>
        <div><div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;">Dersler</div><div class="trainer-certs">${dersler}</div></div>
        <div class="trainer-bio">${t.bio}</div>
      </div>`;
  });
}

// ═══════════════════════════════════════════
// GİRİŞ / ÇIKIŞ SAYFASI
// ═══════════════════════════════════════════
const girisCikisData = [
  { uye:'Ahmet Yılmaz',  giris:'07:30', cikis:'09:15', turu:'kart',   durum:'cikis' },
  { uye:'Fatma Kaya',    giris:'08:00', cikis:null,     turu:'qr',     durum:'giris' },
  { uye:'Can Öztürk',    giris:'06:00', cikis:'08:00', turu:'normal', durum:'cikis' },
  { uye:'Selin Arslan',  giris:'09:30', cikis:null,     turu:'kart',   durum:'giris' },
];

function renderGirisCikisTable(data) {
  const tbody = document.getElementById('girisCikisTableBody');
  if (!tbody) return;
  const turuLabel = { normal:'Normal', qr:'QR Kod', kart:'Kart' };
  tbody.innerHTML = '';
  data.forEach((l, idx) => {
    const color = avatarColors[idx % avatarColors.length];
    const isInside = l.durum === 'giris';
    let sure = '—';
    if (l.cikis) { const [gh,gm]=l.giris.split(':').map(Number); const [ch,cm]=l.cikis.split(':').map(Number); sure=`${ch-gh} sa ${cm-gm>=0?cm-gm:60+(cm-gm)} dk`; }
    else { sure = '<span style="color:#4ade80;font-weight:600">İçeride</span>'; }
    tbody.innerHTML += `<tr>
      <td><div class="member-info"><div class="m-avatar" style="background:${color}">${getInitials(l.uye)}</div><div class="m-name">${l.uye}</div></div></td>
      <td style="color:var(--text-muted);font-size:12px">${l.giris}</td>
      <td style="color:var(--text-muted);font-size:12px">${l.cikis||'—'}</td>
      <td style="color:var(--text-muted);font-size:12px"><i class="fas ${l.turu==='qr'?'fa-qrcode':l.turu==='kart'?'fa-id-badge':'fa-door-open'}" style="margin-right:6px;color:var(--accent-cyan)"></i>${turuLabel[l.turu]}</td>
      <td style="font-size:12px">${sure}</td>
      <td><span style="font-size:11px;background:${isInside?'rgba(74,222,128,.1)':'rgba(148,163,184,.1)'};color:${isInside?'#4ade80':'#94a3b8'};padding:4px 10px;border-radius:20px;font-weight:600;">${isInside?'İçeride':'Çıktı'}</span></td></tr>`;
  });
}

function renderGirisCikisPage() { renderGirisCikisTable(girisCikisData); }
function filterGirisCikis(st) {
  renderGirisCikisTable(st === 'hepsi' ? girisCikisData : girisCikisData.filter(l => l.durum === st));
}

// ═══════════════════════════════════════════
// EKİPMAN SAYFASI
// ═══════════════════════════════════════════
const ekipmanData = [
  { ad:'Koşu Bandı',           kategori:'Kardio',   adet:8,  satinAlma:'2024-01-15', fiyat:15000, durum:'calisiyor' },
  { ad:'Eliptik Bisiklet',     kategori:'Kardio',   adet:4,  satinAlma:'2024-01-15', fiyat:12000, durum:'calisiyor' },
  { ad:'Ağırlık Sehpası',      kategori:'Güç',      adet:10, satinAlma:'2024-02-01', fiyat:800,   durum:'calisiyor' },
  { ad:'Dumbbell Seti',        kategori:'Güç',      adet:5,  satinAlma:'2024-02-01', fiyat:3500,  durum:'calisiyor' },
  { ad:'Kürek Çekme Makinesi', kategori:'Kardio',   adet:2,  satinAlma:'2024-03-10', fiyat:9000,  durum:'bakimda' },
  { ad:'Smith Machine',        kategori:'Güç',      adet:2,  satinAlma:'2024-03-10', fiyat:18000, durum:'calisiyor' },
  { ad:'Yoga Matı',            kategori:'Esneklik', adet:20, satinAlma:'2024-04-01', fiyat:150,   durum:'calisiyor' },
];
const bakimData = [
  { ekipman:'Kürek Çekme Makinesi', tarih:'2026-03-10', maliyet:1200, yapan:'Teknik Servis A', aciklama:'Motor yağlama ve kemer değişimi.', sonraki:'2026-06-10', durum:'tamamlandi' },
  { ekipman:'Koşu Bandı',           tarih:'2026-02-20', maliyet:500,  yapan:'Teknik Servis B', aciklama:'Yıllık rutin bakım.',              sonraki:'2026-08-20', durum:'tamamlandi' },
];

function renderEkipmanTable(data) {
  const tbody = document.getElementById('ekipmanTableBody');
  if (!tbody) return;
  const durumStyle = { calisiyor:{text:'Çalışıyor',color:'#4ade80'}, bakimda:{text:'Bakımda',color:'#fbbf24'}, arizali:{text:'Arızalı',color:'#f87171'} };
  const catIcon = { 'Kardio':'🏃', 'Güç':'💪', 'Esneklik':'🧘' };
  tbody.innerHTML = '';
  data.forEach(e => {
    const d = durumStyle[e.durum]||durumStyle.calisiyor;
    tbody.innerHTML += `<tr>
      <td><div style="display:flex;align-items:center;gap:10px"><span style="font-size:17px">${catIcon[e.kategori]||'🔧'}</span><span class="m-name">${e.ad}</span></div></td>
      <td style="color:var(--text-muted);font-size:12px">${e.kategori}</td>
      <td style="color:var(--text-muted);font-size:12px">${e.adet}</td>
      <td style="color:var(--text-muted);font-size:12px">${e.satinAlma}</td>
      <td style="font-family:'Clash Display',sans-serif;font-weight:700;color:var(--text-muted)">₺${e.fiyat.toLocaleString('tr-TR')}</td>
      <td><span style="font-size:11px;background:${d.color}20;color:${d.color};padding:4px 10px;border-radius:20px;font-weight:600;">${d.text}</span></td></tr>`;
  });
}

function renderEkipmanPage() {
  renderEkipmanTable(ekipmanData);
  const bTb = document.getElementById('bakimTableBody');
  if (!bTb) return;
  bTb.innerHTML = '';
  bakimData.forEach(b => {
    bTb.innerHTML += `<tr>
      <td class="m-name">${b.ekipman}</td>
      <td style="color:var(--text-muted);font-size:12px">${b.tarih}</td>
      <td style="font-family:'Clash Display',sans-serif;font-weight:700;color:#fbbf24">₺${b.maliyet.toLocaleString('tr-TR')}</td>
      <td style="color:var(--text-muted);font-size:12px">${b.yapan}</td>
      <td style="color:var(--text-muted);font-size:12px">${b.aciklama}</td>
      <td style="color:var(--text-muted);font-size:12px">${b.sonraki}</td>
      <td><span style="font-size:11px;background:rgba(74,222,128,.1);color:#4ade80;padding:4px 10px;border-radius:20px;font-weight:600;">Tamamlandı</span></td></tr>`;
  });
}

function filterEkipman(st) {
  renderEkipmanTable(st === 'hepsi' ? ekipmanData : ekipmanData.filter(e => e.durum === st));
}

// ═══════════════════════════════════════════
// RAPORLAR SAYFASI
// ═══════════════════════════════════════════
function renderRaporlarPage() {
  Object.values(raporCharts).forEach(c => c.destroy());
  raporCharts = {};
  const baseOpt = { responsive:true, maintainAspectRatio:false, plugins:{ legend:{ labels:{ color:'rgba(200,210,255,0.7)', font:{size:11} } } }, scales:{ x:{ grid:{ color:'rgba(255,255,255,0.04)' }, ticks:{ color:'rgba(200,210,255,0.5)' }, border:{ display:false } }, y:{ grid:{ color:'rgba(255,255,255,0.04)' }, ticks:{ color:'rgba(200,210,255,0.5)' }, border:{ display:false } } } };

  const c1 = document.getElementById('raporGelirChart');
  if (c1) { raporCharts.gelir = new Chart(c1.getContext('2d'), { type:'bar', data:{ labels:['Eyl','Eki','Kas','Ara','Oca','Şub','Mar'], datasets:[{ label:'Gelir (₺)', data:[32000,37000,41000,38000,43000,45000,47200], backgroundColor:'rgba(139,92,246,0.6)', borderRadius:8, barThickness:24 }] }, options:{...baseOpt, plugins:{legend:{display:false}}} }); }

  const c2 = document.getElementById('raporUyeChart');
  if (c2) { const g2=c2.getContext('2d').createLinearGradient(0,0,0,220); g2.addColorStop(0,'rgba(0,212,255,0.3)'); g2.addColorStop(1,'rgba(0,0,0,0)'); raporCharts.uye = new Chart(c2.getContext('2d'), { type:'line', data:{ labels:['Eyl','Eki','Kas','Ara','Oca','Şub','Mar'], datasets:[{ label:'Toplam Üye', data:[180,195,210,205,228,238,248], borderColor:'rgba(0,212,255,0.8)', backgroundColor:g2, fill:true, tension:0.4, pointRadius:4, pointBackgroundColor:'rgba(0,212,255,0.8)' }] }, options:{...baseOpt, plugins:{legend:{display:false}}} }); }

  const c3 = document.getElementById('raporOdemeChart');
  if (c3) { raporCharts.odeme = new Chart(c3.getContext('2d'), { type:'doughnut', data:{ labels:['Kredi Kartı','Nakit','Havale','Online'], datasets:[{ data:[5,2,1,1], backgroundColor:['#a78bfa','#4ade80','#fbbf24','#00d4ff'], borderWidth:0 }] }, options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'bottom', labels:{ color:'rgba(200,210,255,0.7)', padding:14, font:{size:11} } } } } }); }

  const c4 = document.getElementById('raporDersChart');
  if (c4) { raporCharts.ders = new Chart(c4.getContext('2d'), { type:'bar', data:{ labels:['Yoga','Kickboks','Aqua','Fonk.Fitness','Pilates'], datasets:[{ label:'Katılım %', data:[80,90,53,75,67], backgroundColor:['#a78bfa','#f472b6','#00d4ff','#fb923c','#4ade80'], borderRadius:8, barThickness:20 }] }, options:{...baseOpt, plugins:{legend:{display:false}}, indexAxis:'y'} }); }
}

// ═══════════════════════════════════════════
// AYARLAR SAYFASI
// ═══════════════════════════════════════════
function renderAyarlarPage() {
  const tbody = document.getElementById('ayarlarKullaniciTable');
  if (!tbody) return;
  const users = [
    { name:'Admin Yönetici', rol:'Süper Admin',    email:'admin@fitzone.com', durum:'aktif' },
    { name:'Kemal Antrenör', rol:'Antrenör',       email:'kemal@fitzone.com', durum:'aktif' },
    { name:'Deniz Koç',      rol:'Antrenör',       email:'deniz@fitzone.com', durum:'aktif' },
    { name:'Elif Aydın',     rol:'Resepsiyonist',  email:'elif@fitzone.com',  durum:'aktif' },
  ];
  const rolColors = { 'Süper Admin':'#a78bfa', 'Antrenör':'#00d4ff', 'Resepsiyonist':'#fbbf24' };
  tbody.innerHTML = '';
  users.forEach((u, idx) => {
    const color = avatarColors[idx % avatarColors.length];
    const rc = rolColors[u.rol] || '#94a3b8';
    tbody.innerHTML += `<tr>
      <td><div class="member-info"><div class="m-avatar" style="background:${color}">${getInitials(u.name)}</div><div class="m-name">${u.name}</div></div></td>
      <td><span style="font-size:11px;background:${rc}20;color:${rc};padding:4px 10px;border-radius:20px;font-weight:600;">${u.rol}</span></td>
      <td style="color:var(--text-muted);font-size:12px">${u.email}</td>
      <td><span class="status-dot aktif">Aktif</span></td></tr>`;
  });
}

// ═══════════════════════════════════════════
// AUTH — GİRİŞ / ÇIKIŞ / MODAL
// ═══════════════════════════════════════════
let currentRole = null;

// --- Modal helpers ---
function showLoginModal()    { document.getElementById('loginModal').classList.add('open'); }
function closeLoginModal()   { document.getElementById('loginModal').classList.remove('open'); }
function showRegisterModal() { document.getElementById('registerModal').classList.add('open'); }
function closeRegisterModal(){ document.getElementById('registerModal').classList.remove('open'); }
function showForgotModal()   { document.getElementById('forgotModal').classList.add('open'); }
function closeForgotModal()  { document.getElementById('forgotModal').classList.remove('open'); }

// --- Login handler (demo — no real auth) ---
function handleLogin() {
  const role = document.getElementById('loginRole').value;
  closeLoginModal();
  loginAs(role);
}

function handleRegister() {
  closeRegisterModal();
  showToast('Kayıt başarılı! Giriş yapabilirsiniz.');
  setTimeout(() => showLoginModal(), 600);
}

function handleForgot() {
  closeForgotModal();
  showToast('Şifre sıfırlama linki gönderildi!');
  setTimeout(() => showLoginModal(), 600);
}

// --- Role-based login ---
const roleProfiles = {
  admin:    { name: 'Admin Yönetici',   role: 'Süper Admin', initials: 'AY' },
  uye:     { name: 'Ahmet Yılmaz',     role: 'Üye',         initials: 'AH' },
  antrenor: { name: 'Kemal Antrenör',   role: 'Antrenör',    initials: 'KA' },
};

function loginAs(role) {
  currentRole = role;
  const profile = roleProfiles[role];

  // Update sidebar user info
  document.getElementById('sidebarAvatar').textContent   = profile.initials;
  document.getElementById('sidebarUserName').textContent  = profile.name;
  document.getElementById('sidebarUserRole').textContent  = profile.role;

  // Filter sidebar items by role
  applySidebarRole(role);

  // Stats grid: sadece admin'de görünür
  const statsGrid = document.querySelector('#page-dashboard .stats-grid');
  if (statsGrid) statsGrid.style.display = role === 'admin' ? '' : 'none';

  const isUye     = role === 'uye';
  const isAntrenor = role === 'antrenor';
  const isAdmin   = role === 'admin';

  // Admin-only büyük bölümler (grafik+sağpanel, üye listesi)
  ['adminContentGrid', 'adminMembersGrid'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = isAdmin ? '' : 'none';
  });

  // Üye-only bölüm
  const uyeGrid = document.getElementById('uyeDashboardGrid');
  if (uyeGrid) uyeGrid.style.display = isUye ? '' : 'none';

  // Antrenör-only bölüm
  const antrenorGrid = document.getElementById('antrenorDashboardGrid');
  if (antrenorGrid) antrenorGrid.style.display = isAntrenor ? '' : 'none';

  // Bottom Grid 1 kartları
  // Antrenör ve Üye: Abonelik Planları + Hızlı İşlemler gizli
  ['dashPlanlariCard', 'dashHizliIslemlerCard'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = isAdmin ? '' : 'none';
  });
  // Antrenör ve Üye: Bugünkü Dersler de gizli (kendi takvim bölümleri var)
  const bugunDersler = document.getElementById('dashBugunDerslerCard');
  if (bugunDersler) bugunDersler.style.display = isAdmin ? '' : 'none';
  // Grid1 sütun ayarı
  const bg1 = document.getElementById('dashBottomGrid1');
  if (bg1) bg1.style.gridTemplateColumns = isAdmin ? '' : '1fr';

  // Bottom Grid 2 kartları
  const girisCikis   = document.getElementById('dashGirisCikisCard');
  const antrenorlerC = document.getElementById('dashAntrenorlerCard');
  const ekipmanC     = document.getElementById('dashEkipmanCard');
  if (girisCikis)   girisCikis.style.display   = isAdmin ? '' : 'none';
  if (antrenorlerC) antrenorlerC.style.display  = isAdmin ? '' : 'none';
  // Ekipman: admin ve üye'de görünür, antrenörde gizli
  if (ekipmanC) ekipmanC.style.display = isAntrenor ? 'none' : '';
  // Grid2 sütun: üyede 2 kart (antrenörler yok, ekipman var → 1 sütun ekipman ile olmaz doğrusu)
  const bg2 = document.getElementById('dashBottomGrid2');
  if (bg2) {
    if (isAdmin)   bg2.style.gridTemplateColumns = '';
    if (isUye)     bg2.style.gridTemplateColumns = '1fr';
    if (isAntrenor) bg2.style.display = 'none';
  }

  // Karşılama mesajını kişiye göre güncelle
  const welcomeEl = document.getElementById('dashboardWelcome');
  if (welcomeEl) welcomeEl.textContent = `Hoş Geldiniz, ${profile.name} 👋`;

  // Hide landing, show panel
  document.getElementById('landing-page').style.display = 'none';
  document.getElementById('app-layout').style.display = '';

  // Reset to dashboard
  currentPage = '';
  const dashLink = document.querySelector('[data-page="dashboard"]');
  if (dashLink) navigateTo('dashboard', dashLink);

  initApp();
  if (isUye)      { renderUyeWeeklyCalendar(); renderUyeAktiviteChart(); }
  if (isAntrenor) { renderAntrenorWeeklyCalendar(); renderAntrenorKatilimChart(); }
  showToast(`${profile.role} olarak giriş yapıldı!`);
}

function applySidebarRole(role) {
  // Nav items
  document.querySelectorAll('.nav-item[data-role]').forEach(el => {
    const roles = el.getAttribute('data-role').split(' ');
    el.style.display = roles.includes(role) ? '' : 'none';
  });
  // Section labels
  document.querySelectorAll('.nav-section-label[data-role]').forEach(el => {
    const roles = el.getAttribute('data-role').split(' ');
    el.style.display = roles.includes(role) ? '' : 'none';
  });
  // Section labels without data-role: show for admin only
  document.querySelectorAll('.nav-section-label:not([data-role])').forEach(el => {
    el.style.display = role === 'admin' ? '' : 'none';
  });
}

function logout() {
  currentRole = null;
  // Show landing, hide panel
  document.getElementById('landing-page').style.display = '';
  document.getElementById('app-layout').style.display = 'none';
  window.scrollTo(0, 0);
}

// ═══════════════════════════════════════════
// ÜYE DASHBOARD — HAFTALIK DERS TAKVİMİ
// ═══════════════════════════════════════════
function renderUyeWeeklyCalendar() {
  const container = document.getElementById('uyeWeeklyCalendar');
  if (!container) return;

  const gunler = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const dersRenkleri = {
    'Yoga Flow':           { bg:'rgba(139,92,246,.15)',  color:'#a78bfa', icon:'🧘' },
    'Kickboks':            { bg:'rgba(244,114,182,.15)', color:'#f472b6', icon:'🥊' },
    'Aqua Aerobik':        { bg:'rgba(0,212,255,.12)',   color:'#00d4ff', icon:'🏊' },
    'Fonksiyonel Fitness': { bg:'rgba(251,146,60,.15)',  color:'#fb923c', icon:'🏋️' },
    'Pilates':             { bg:'rgba(74,222,128,.12)',  color:'#4ade80', icon:'🤸' },
  };
  // Haftalık program verisi (programData'dan)
  const programMap = {};
  gunler.forEach(g => programMap[g] = []);
  programData.forEach(p => { if (programMap[p.gun]) programMap[p.gun].push(p); });

  // Üyenin rezervasyonları
  const currentProfile = roleProfiles[currentRole];
  const uyeRezervasyonlar = rezervasyonData.filter(r => r.uye === currentProfile?.name).map(r => r.ders + r.tarih);

  let html = `
    <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:10px;min-width:600px;padding:4px 2px 8px;">
  `;
  gunler.forEach(gun => {
    const dersler = programMap[gun] || [];
    html += `
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;text-align:center;padding:4px 0;border-bottom:1px solid var(--glass-border);">${gun.slice(0,3)}</div>
    `;
    if (dersler.length === 0) {
      html += `<div style="text-align:center;color:var(--text-muted);font-size:11px;padding:12px 0;">—</div>`;
    } else {
      dersler.forEach(d => {
        const r = dersRenkleri[d.ders] || { bg:'rgba(100,116,139,.12)', color:'#94a3b8', icon:'📋' };
        html += `
          <div style="background:${r.bg};border:1px solid ${r.color}30;border-radius:10px;padding:8px 7px;cursor:pointer;transition:transform .15s,box-shadow .15s;" 
               onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px ${r.color}25'"
               onmouseout="this.style.transform='';this.style.boxShadow=''">
            <div style="font-size:16px;text-align:center;margin-bottom:4px;">${r.icon}</div>
            <div style="font-size:10px;font-weight:700;color:${r.color};text-align:center;line-height:1.3;">${d.ders}</div>
            <div style="font-size:9px;color:var(--text-muted);text-align:center;margin-top:3px;">${d.saat}</div>
            <div style="font-size:9px;color:var(--text-muted);text-align:center;">${d.salon}</div>
          </div>
        `;
      });
    }
    html += `</div>`;
  });
  html += `</div>`;
  container.innerHTML = html;
}

// ═══════════════════════════════════════════
// ÜYE DASHBOARD — AKTİVİTE GRAFİĞİ
// ═══════════════════════════════════════════
let uyeAktiviteChartInstance = null;
function renderUyeAktiviteChart() {
  const ctx = document.getElementById('uyeAktiviteChart');
  if (!ctx) return;
  if (uyeAktiviteChartInstance) uyeAktiviteChartInstance.destroy();

  // Üyenin bu haftaki aktivite verisi (demo)
  const gunler     = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
  const gunKisa    = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
  const aktivite   = [60, 0, 45, 60, 50, 0, 30]; // dakika cinsinden
  const toplam     = aktivite.reduce((a, b) => a + b, 0);

  // Soft pastel renkler
  const softColors = [
    'rgba(167, 139, 250, 0.85)',  // Lavanta
    'rgba(253, 186, 116, 0.85)',  // Şeftali
    'rgba(110, 231, 183, 0.85)',  // Nane
    'rgba(125, 211, 252, 0.85)',  // Gök mavisi
    'rgba(251, 146, 182, 0.85)',  // Gül
    'rgba(253, 224, 71, 0.85)',   // Limon
    'rgba(165, 180, 252, 0.85)',  // Buz moru
  ];
  const softBorders = [
    'rgba(167, 139, 250, 1)',
    'rgba(253, 186, 116, 1)',
    'rgba(110, 231, 183, 1)',
    'rgba(125, 211, 252, 1)',
    'rgba(251, 146, 182, 1)',
    'rgba(253, 224, 71, 1)',
    'rgba(165, 180, 252, 1)',
  ];

  // 0 dakika olan günleri "Dinlenme" olarak göster, çok küçük dilim ver
  const chartData   = aktivite.map(v => v > 0 ? v : 2);
  const chartColors = aktivite.map((v, i) => v > 0 ? softColors[i] : 'rgba(148,163,184,0.15)');
  const chartBorders = aktivite.map((v, i) => v > 0 ? softBorders[i] : 'rgba(148,163,184,0.25)');

  // Merkez etiketi güncelle
  const centerLabel = document.getElementById('uyeAktiviteCenterLabel');
  if (centerLabel) {
    centerLabel.querySelector('.uye-aktivite-center-value').textContent = toplam;
    centerLabel.querySelector('.uye-aktivite-center-text').textContent = 'dakika';
  }

  uyeAktiviteChartInstance = new Chart(ctx.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: gunler,
      datasets: [{
        data: chartData,
        backgroundColor: chartColors,
        borderColor: chartBorders,
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverOffset: 8,
        spacing: 3,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(15,20,40,0.95)',
          borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1,
          titleColor: '#f0f4ff', bodyColor: '#c8d6ff',
          padding: 12, cornerRadius: 10,
          titleFont: { size: 13, weight: '600' },
          bodyFont: { size: 12 },
          callbacks: {
            label: function(context) {
              const val = aktivite[context.dataIndex];
              return val > 0 ? ` ${val} dakika` : ' Dinlenme günü';
            }
          }
        }
      }
    }
  });

  // Legend oluştur
  const legendEl = document.getElementById('uyeAktiviteLegend');
  if (legendEl) {
    legendEl.innerHTML = '';
    gunler.forEach((gun, i) => {
      const val = aktivite[i];
      const colorDot = val > 0 ? softColors[i] : 'rgba(148,163,184,0.3)';
      legendEl.innerHTML += `
        <div class="uye-aktivite-legend-item">
          <div class="uye-aktivite-legend-dot" style="background:${colorDot};box-shadow:0 0 8px ${colorDot}"></div>
          <div class="uye-aktivite-legend-info">
            <span class="uye-aktivite-legend-day">${gunKisa[i]}</span>
            <span class="uye-aktivite-legend-val">${val > 0 ? val + ' dk' : 'Dinlenme'}</span>
          </div>
        </div>`;
    });
  }
}

// ═══════════════════════════════════════════
// ANTRENÖR DASHBOARD — HAFTALIK PROGRAM TAKVİMİ
// ═══════════════════════════════════════════
function renderAntrenorWeeklyCalendar() {
  const container = document.getElementById('antrenorWeeklyCalendar');
  if (!container) return;

  const currentProfile = roleProfiles[currentRole]; // Kemal Antrenör
  const gunler = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

  const dersRenkleri = {
    'Yoga Flow':           { bg:'rgba(139,92,246,.15)',  color:'#a78bfa', icon:'🧘' },
    'Kickboks':            { bg:'rgba(244,114,182,.15)', color:'#f472b6', icon:'🥊' },
    'Aqua Aerobik':        { bg:'rgba(0,212,255,.12)',   color:'#00d4ff', icon:'🏊' },
    'Fonksiyonel Fitness': { bg:'rgba(251,146,60,.15)',  color:'#fb923c', icon:'🏋️' },
    'Pilates':             { bg:'rgba(74,222,128,.12)',  color:'#4ade80', icon:'🤸' },
  };

  // Sadece bu antrenörün derslerini filtrele
  const benimDersler = derslerDemoData
    .filter(d => d.antrenor === currentProfile.name)
    .map(d => d.ders);

  // Programa göre bu antrenörün derslerini günlere yaz
  const programMap = {};
  gunler.forEach(g => programMap[g] = []);
  programData.forEach(p => {
    if (programMap[p.gun] && benimDersler.includes(p.ders)) programMap[p.gun].push(p);
  });

  let html = `<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:10px;min-width:580px;padding:4px 2px 8px;">`;
  gunler.forEach(gun => {
    const dersler = programMap[gun] || [];
    html += `
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;text-align:center;padding:4px 0;border-bottom:1px solid var(--glass-border);">${gun.slice(0,3)}</div>
    `;
    if (dersler.length === 0) {
      html += `<div style="text-align:center;color:var(--text-muted);font-size:20px;padding:16px 0;">—</div>`;
    } else {
      dersler.forEach(d => {
        const r = dersRenkleri[d.ders] || { bg:'rgba(100,116,139,.12)', color:'#94a3b8', icon:'📋' };
        html += `
          <div style="background:${r.bg};border:1px solid ${r.color}35;border-radius:10px;padding:9px 7px;cursor:default;transition:transform .15s,box-shadow .15s;"
               onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 24px ${r.color}30'"
               onmouseout="this.style.transform='';this.style.boxShadow=''">
            <div style="font-size:18px;text-align:center;margin-bottom:4px;">${r.icon}</div>
            <div style="font-size:10px;font-weight:700;color:${r.color};text-align:center;line-height:1.3;">${d.ders}</div>
            <div style="font-size:9px;color:var(--text-muted);text-align:center;margin-top:3px;">${d.saat}</div>
            <div style="font-size:9px;color:var(--text-muted);text-align:center;">${d.salon}</div>
          </div>`;
      });
    }
    html += `</div>`;
  });
  html += `</div>`;
  container.innerHTML = html;

  // Ders listesini render et
  renderAntrenorDersListesi(benimDersler);
}

function renderAntrenorDersListesi(benimDersler) {
  const container = document.getElementById('antrenorDersListesi');
  if (!container) return;
  const dersRenkleri = {
    'Yoga Flow':           { color:'#a78bfa', icon:'🧘', katilim:80 },
    'Kickboks':            { color:'#f472b6', icon:'🥊', katilim:90 },
    'Aqua Aerobik':        { color:'#00d4ff', icon:'🏊', katilim:53 },
    'Fonksiyonel Fitness': { color:'#fb923c', icon:'🏋️', katilim:75 },
    'Pilates':             { color:'#4ade80', icon:'🤸', katilim:67 },
  };
  container.innerHTML = '<div style="display:flex;flex-direction:column;gap:10px;padding:4px 0;">';
  derslerDemoData.filter(d => benimDersler.includes(d.ders)).forEach(d => {
    const r = dersRenkleri[d.ders] || { color:'#94a3b8', icon:'📋', katilim:0 };
    container.innerHTML += `
      <div class="plan-card">
        <div class="plan-left">
          <div class="plan-icon" style="background:${r.color}18;color:${r.color};font-size:17px;">${r.icon}</div>
          <div>
            <div class="plan-name">${d.ders}</div>
            <div class="plan-members">${d.sure} dk · ${d.kontenjan} kişi · ${d.kategori}</div>
          </div>
        </div>
        <div style="font-size:11px;background:${r.color}18;color:${r.color};padding:4px 10px;border-radius:20px;font-weight:700;">%${r.katilim}</div>
      </div>`;
  });
  container.innerHTML += '</div>';
}

// ═══════════════════════════════════════════
// ANTRENÖR DASHBOARD — KATILIM GRAFİĞİ
// ═══════════════════════════════════════════
let antrenorKatilimChartInstance = null;
function renderAntrenorKatilimChart() {
  const ctx = document.getElementById('antrenorKatilimChart');
  if (!ctx) return;
  if (antrenorKatilimChartInstance) antrenorKatilimChartInstance.destroy();

  const currentProfile = roleProfiles[currentRole];
  const benimDersler = derslerDemoData
    .filter(d => d.antrenor === currentProfile.name);

  const labels = benimDersler.map(d => d.ders);
  const katilimMap = {
    'Kickboks':90,'Fonksiyonel Fitness':75,'Yoga Flow':80,'Aqua Aerobik':53,'Pilates':67
  };
  const data   = benimDersler.map(d => katilimMap[d.ders] || 70);
  const colors = ['#f472b6','#fb923c','#a78bfa','#00d4ff','#4ade80'];

  antrenorKatilimChartInstance = new Chart(ctx.getContext('2d'), {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Katılım %',
        data,
        backgroundColor: colors.slice(0, labels.length).map(c => c + 'CC'),
        borderColor:     colors.slice(0, labels.length),
        borderWidth: 1.5,
        borderRadius: 10,
        borderSkipped: false,
        barThickness: 30,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(15,20,40,0.95)',
          borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1,
          titleColor: '#f0f4ff', bodyColor: '#94a3b8',
          padding: 10, cornerRadius: 8,
          callbacks: { label: c => `Katılım: %${c.parsed.x}` }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: 'rgba(200,210,255,0.5)', font: { size: 11 }, callback: v => '%' + v },
          border: { display: false }, min: 0, max: 100
        },
        y: {
          grid: { display: false },
          ticks: { color: 'rgba(200,210,255,0.6)', font: { size: 11 } },
          border: { display: false }
        }
      }
    }
  });
}
