function toggleHidden() {
    var hiddenItems = document.querySelectorAll('.hidden');
    hiddenItems.forEach(function (item) {
        item.style.display = (item.style.display === 'none' || item.style.display === 'block') ? 'list-item' : 'none';
    });
}