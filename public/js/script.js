document.addEventListener('contextmenu', function (event) {
    if (event.target.tagName === 'IMG' || event.target.classList.contains('img-protection-overlay')) {
        event.preventDefault();
        showToast('Las imágenes están protegidas por AgroBarbero SRL.');
        return false;
    }
});

document.addEventListener('dragstart', function (event) {
    if (event.target.tagName === 'IMG') {
        event.preventDefault();
        return false;
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    const isHidden = menu.classList.contains('hidden');

    menu.classList.toggle('hidden', !isHidden);
    icon.classList.toggle('fa-bars', !isHidden);
    icon.classList.toggle('fa-xmark', isHidden);
}

function filterMachinery(brand) {
    const cards = document.querySelectorAll('.machinery-card');
    const tabs = document.querySelectorAll('.brand-tab');

    const activeClasses = {
        all: ['bg-blue-600', 'text-white'],
        agrometal: ['bg-amber-500', 'text-slate-950'],
        mainero: ['bg-red-600', 'text-white'],
        tbeh: ['bg-amber-500', 'text-slate-950'],
        agrochery: ['bg-emerald-600', 'text-white']
    };
    const inactiveClasses = ['bg-white', 'text-slate-700', 'border', 'border-slate-200'];

    tabs.forEach(function (tab) {
        Object.values(activeClasses).forEach(function (classes) {
            tab.classList.remove(...classes);
        });
        tab.classList.add(...inactiveClasses);
    });

    const activeTab = document.getElementById('tab-' + brand);
    if (activeTab && activeClasses[brand]) {
        activeTab.classList.remove(...inactiveClasses);
        activeTab.classList.add(...activeClasses[brand]);
    }

    cards.forEach(function (card) {
        card.style.display = brand === 'all' || card.classList.contains('brand-' + brand) ? 'flex' : 'none';
    });

    const machinerySection = document.getElementById('maquinaria');
    if (machinerySection) {
        machinerySection.scrollIntoView({ behavior: 'smooth' });
    }
}

function openQuoteModal(machineryName) {
    document.getElementById('modal-machinery-name').value = machineryName;
    document.getElementById('modal-display-machinery').value = machineryName;
    document.getElementById('quote-modal').classList.remove('hidden');
}

function closeQuoteModal() {
    document.getElementById('quote-modal').classList.add('hidden');
}

function handleModalSubmit(event) {
    event.preventDefault();
    const machine = document.getElementById('modal-display-machinery').value;
    const name = document.getElementById('modal-user-name').value;
    const phone = document.getElementById('modal-user-phone').value;
    const location = document.getElementById('modal-user-loc').value;
    const comment = document.getElementById('modal-user-comment').value;
    const message = `Hola AgroBarbero, deseo solicitar cotización por: ${machine}. %0ANombre: ${name} %0ATeléfono: ${phone} %0ALocalidad: ${location} %0AComentario: ${comment}`;

    window.open(`https://wa.me/542336493108?text=${message}`, '_blank');
    closeQuoteModal();
}

function handleSpareQuote(event) {
    event.preventDefault();
    const brand = document.getElementById('part-brand').value;
    const model = document.getElementById('part-model').value;
    const description = document.getElementById('part-desc').value;
    const name = document.getElementById('part-name').value;
    const phone = document.getElementById('part-phone').value;
    const message = `Hola AgroBarbero, consulta de Repuesto: %0AMarca: ${brand} %0AModelo: ${model} %0APieza: ${description} %0ANombre: ${name} %0ATeléfono: ${phone}`;

    window.open(`https://wa.me/542336493108?text=${message}`, '_blank');
    showToast('Redirigiendo a WhatsApp de AgroBarbero...');
}

function handleContactSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('contact-name').value;
    const phone = document.getElementById('contact-phone').value;
    const location = document.getElementById('contact-location').value;
    const reason = document.getElementById('contact-reason').value;
    const messageText = document.getElementById('contact-message').value;
    const message = `Hola AgroBarbero, mensaje de contacto web: %0AMotivo: ${reason} %0ANombre: ${name} %0ATeléfono: ${phone} %0ALocalidad: ${location} %0AMensaje: ${messageText}`;

    window.open(`https://wa.me/542336493108?text=${message}`, '_blank');
    showToast('Su consulta ha sido enviada con éxito.');
    document.getElementById('contact-form').reset();
}

function showToast(text) {
    const toast = document.getElementById('toast-message');
    const toastText = document.getElementById('toast-text');

    toastText.textContent = text;
    toast.classList.remove('hidden');
    setTimeout(function () {
        toast.classList.add('hidden');
    }, 3500);
}