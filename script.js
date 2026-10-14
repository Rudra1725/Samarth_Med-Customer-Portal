

function switchTab(targetSectionId) {
  const sections = document.querySelectorAll('.page-section');
  sections.forEach(function (sec) {
    sec.classList.remove('active');
  });

  const navTabs = document.querySelectorAll('.nav-tab');
  navTabs.forEach(function (tab) {
    tab.classList.remove('active');
  });

  const targetElement = document.getElementById('section-' + targetSectionId);
  if (targetElement) {
    targetElement.classList.add('active');
  }

  const matchingNavBtn = document.querySelector('.nav-tab[data-target="' + targetSectionId + '"]');
  if (matchingNavBtn) {
    matchingNavBtn.classList.add('active');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleDeliveryAddress() {
  const deliveryType = document.getElementById('custType').value;
  const addressField = document.getElementById('addressField');
  if (deliveryType === 'Delivery') {
    addressField.style.display = 'block';
  } else {
    addressField.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const navTabs = document.querySelectorAll('.nav-tab');
  navTabs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const target = this.getAttribute('data-target');
      switchTab(target);
    });
  });

  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('custName').value.trim();
      const phone = document.getElementById('custPhone').value.trim();
      const type = document.getElementById('custType').value;
      const addr = document.getElementById('deliveryAddress').value.trim();
      const medicines = document.getElementById('medicineList').value.trim();

      const pharmacyPhone = '919834730014';
      let message = 'New Medicine Order Request - Shree Samarth Medical\n';
      message += 'Customer: ' + name + '\n';
      message += 'Phone: ' + phone + '\n';
      message += 'Preference: ' + type + '\n';
      if (type === 'Delivery' && addr !== '') {
        message += 'Delivery Address: ' + addr + '\n';
      }
      if (medicines !== '') {
        message += 'Medicines: ' + medicines + '\n';
      }

      alert('Thank you, ' + name + '. Your order inquiry has been generated. You will now be redirected to communicate with our dispensing desk.');

      const encodedUrl = 'https://wa.me/' + pharmacyPhone + '?text=' + encodeURIComponent(message);
      window.open(encodedUrl, '_blank');

      orderForm.reset();
      toggleDeliveryAddress();
    });
  }

  const wholesaleForm = document.getElementById('wholesaleForm');
  if (wholesaleForm) {
    wholesaleForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const bizName = document.getElementById('bizName').value.trim();
      const contactPerson = document.getElementById('bizContact').value.trim();
      const phone = document.getElementById('bizPhone').value.trim();
      const dl = document.getElementById('bizDl').value.trim();
      const inquiry = document.getElementById('bizRequirement').value.trim();

      const pharmacyPhone = '919834730014';
      let message = 'Wholesale B2B Inquiry - Shree Samarth Distributors\n';
      message += 'Institution: ' + bizName + '\n';
      message += 'Contact Person: ' + contactPerson + '\n';
      message += 'Phone: ' + phone + '\n';
      if (dl !== '') {
        message += 'DL/GST: ' + dl + '\n';
      }
      message += 'Requirement: ' + inquiry;

      alert('Wholesale inquiry submitted for ' + bizName + '. Opening WhatsApp dispatch line.');

      const encodedUrl = 'https://wa.me/' + pharmacyPhone + '?text=' + encodeURIComponent(message);
      window.open(encodedUrl, '_blank');

      wholesaleForm.reset();
    });
  }
});