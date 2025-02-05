function addItem() {
    const itemGroup = document.querySelector('.item-group').cloneNode(true);

    // Limpa os valores dos campos clonados
    const tipoSelect = itemGroup.querySelector('.tipo');
    const qualidadeSelect = itemGroup.querySelector('.qualidade');
    const quantidadeInput = itemGroup.querySelector('.quantidade');

    tipoSelect.selectedIndex = 0;
    qualidadeSelect.selectedIndex = 0;
    quantidadeInput.value = '';

    // Adiciona o botão de remover apenas para os itens adicionados
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = 'Retirar';
    removeButton.onclick = function() { removeItem(this); };
    itemGroup.appendChild(removeButton);

    document.getElementById('itemsContainer').appendChild(itemGroup);
}

function removeItem(button) {
    const itemsContainer = document.getElementById('itemsContainer');
    if (itemsContainer.children.length > 1) {
        button.parentNode.remove();
    }
}