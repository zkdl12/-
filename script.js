function openPage(id) {
    document.getElementById('main-page').style.display = 'none';
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById('page-' + id).style.display = 'block';
    document.getElementById('back-btn').style.display = 'block';
    window.scrollTo(0, 0);
}

function goHome() {
    document.getElementById('main-page').style.display = 'block';
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById('back-btn').style.display = 'none';
}