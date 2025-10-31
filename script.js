// Simple static demo script: saves orders to localStorage and provides language toggle
(function(){
  const i18n = {
    ar: {
      hero_title: "خدمة شحن سهلة وآمنة",
      hero_text: "اشحن رصيد الهاتف، الإنترنت، وبطاقات الألعاب بسرعة. الدفع يدوي في البداية عبر إرفاق إثبات الدفع.",
      start_btn: "ابدأ الآن",
      order_title: "نموذج طلب الشحن",
      field_type: "نوع الشحن",
      opt_recharge: "شحن رصيد",
      opt_internet: "شحن إنترنت",
      opt_game: "بطاقة ألعاب",
      field_network: "الموبايل / العنوان",
      field_amount: "المبلغ (دج أو عملة)",
      field_proof: "إثبات الدفع (رابط أو نص)",
      submit_btn: "إرسال الطلب",
      note_manual: "ستُؤكد الطلبات يدويًا من لوحة التحكم. لاحقًا سنربط CCP/البطاقة الذهبية.",
      how_title: "كيف تعمل الخدمة؟",
      how_step1: "أرسل طلب الشحن هنا مع إثبات الدفع.",
      how_step2: "سوف تتلقى تأكيدًا من لوحة التحكم بعد التحقق.",
      how_step3: "نقوم بشحن الرصيد أو إرسال الكود.",
      admin_title: "الطلبات الواردة",
      admin_note: "الطلبات تخزن محليًا في المتصفح (demo). بعد ربط السيرفر يمكن استبدالها بقاعدة بيانات."
    },
    en: {
      hero_title: "Easy & Secure Top-up Service",
      hero_text: "Top-up airtime, internet bundles and game cards fast. Payments are manual at first by attaching proof.",
      start_btn: "Start now",
      order_title: "Top-up Order Form",
      field_type: "Service type",
      opt_recharge: "Airtime recharge",
      opt_internet: "Internet bundle",
      opt_game: "Game card",
      field_network: "Phone / Wallet address",
      field_amount: "Amount (DZD or currency)",
      field_proof: "Payment proof (link / text)",
      submit_btn: "Submit order",
      note_manual: "Orders will be confirmed manually from admin panel. We'll link CCP/Gold card later.",
      how_title: "How the service works?",
      how_step1: "Send a top-up request here with payment proof.",
      how_step2: "You will receive confirmation from admin after verification.",
      how_step3: "We deliver the top-up or send the code.",
      admin_title: "Incoming orders",
      admin_note: "Orders are stored locally in the browser (demo). After server setup replace with a database."
    }
  };

  // language
  const lang = localStorage.getItem('esh_lang') || 'ar';
  function applyLang(l){
    const nodes = document.querySelectorAll('[data-i18n]');
    nodes.forEach(n=>{
      const key = n.getAttribute('data-i18n');
      if(i18n[l] && i18n[l][key]) n.innerText = i18n[l][key];
    });
    if(document.documentElement) {
      document.documentElement.lang = l;
      document.documentElement.dir = (l==='ar'?'rtl':'ltr');
    }
    localStorage.setItem('esh_lang', l);
  }
  document.addEventListener('DOMContentLoaded', ()=>{
    applyLang(lang);
    document.getElementById('btn-ar').addEventListener('click', ()=> applyLang('ar'));
    document.getElementById('btn-en').addEventListener('click', ()=> applyLang('en'));

    const form = document.getElementById('orderForm');
    if(form){
      form.addEventListener('submit', e=>{
        e.preventDefault();
        const order = {
          id: 'ord_' + Date.now(),
          type: document.getElementById('serviceType').value,
          target: document.getElementById('target').value,
          amount: document.getElementById('amount').value,
          proof: document.getElementById('proof').value,
          status: 'pending',
          created: new Date().toISOString()
        };
        const orders = JSON.parse(localStorage.getItem('esh_orders') || '[]');
        orders.unshift(order);
        localStorage.setItem('esh_orders', JSON.stringify(orders));
        alert('تم إرسال الطلب. سنؤكده يدويًا.');
        form.reset();
      });
    }

    // admin page rendering
    if(document.getElementById('ordersList')){
      const list = document.getElementById('ordersList');
      function render(){
        const orders = JSON.parse(localStorage.getItem('esh_orders') || '[]');
        if(!orders.length) { list.innerHTML = '<p class="small">لا توجد طلبات حالياً</p>'; return; }
        list.innerHTML = '';
        orders.forEach(o=>{
          const div = document.createElement('div');
          div.className = 'order';
          div.innerHTML = `
            <div><strong>id:</strong> ${o.id}</div>
            <div><strong>type:</strong> ${o.type}</div>
            <div><strong>target:</strong> ${o.target}</div>
            <div><strong>amount:</strong> ${o.amount}</div>
            <div><strong>proof:</strong> ${o.proof}</div>
            <div class="small">created: ${new Date(o.created).toLocaleString()}</div>
            <div class="actions">
              <button class="btn btn-confirm" data-id="${o.id}">Confirm</button>
              <button class="btn btn-delete" data-id="${o.id}">Delete</button>
            </div>
          `;
          list.appendChild(div);
        });
        // attach handlers
        document.querySelectorAll('.btn-confirm').forEach(b=>{
          b.addEventListener('click', ()=>{
            const id = b.getAttribute('data-id');
            const orders = JSON.parse(localStorage.getItem('esh_orders') || '[]');
            const idx = orders.findIndex(x=>x.id===id);
            if(idx>-1){ orders[idx].status='confirmed'; localStorage.setItem('esh_orders', JSON.stringify(orders)); render(); alert('Order confirmed.'); }
          });
        });
        document.querySelectorAll('.btn-delete').forEach(b=>{
          b.addEventListener('click', ()=>{
            const id = b.getAttribute('data-id');
            let orders = JSON.parse(localStorage.getItem('esh_orders') || '[]');
            orders = orders.filter(x=>x.id!==id);
            localStorage.setItem('esh_orders', JSON.stringify(orders)); render();
          });
        });
      }
      render();
    }
  });
})();