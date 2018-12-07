const trees = document.querySelector('.firtrees').children;
const order = document.querySelector('.order');
const orderForm = document.querySelector('.order-form');
let orderBody = [];

for(let i = 0; i < trees.length; i++) {
    const prices = trees[i].children[2].children;

    for(let i = 0; i < prices.length; i++) {
        prices[i].addEventListener('click', clickHandler);
    }
}

function clickHandler (e) {
    if(e.target.classList.contains('cost') || e.target.classList.contains('height')) {
        orderBody.push(e.target.parentElement.parentElement.getAttribute('data-title'));
        orderBody.push(e.target.parentElement.children[1].textContent);
    }

    order.style.transform = 'scale(1)';
}

const $ = (value) => document.querySelector(value); 

document.querySelector('.send-button').addEventListener('click', async() => {
    const name = $('.order-name').value;
    const phone = $('.order-number').value;

    const res = await fetch('/offer/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           name, phone, orderBody 
        })
    });

    const data = await res.json();
    const massage = $('.massage');

    if(data.created) {
        if(massage.classList.contains('error')) massage.classList.remove('error');

        massage.classList.add('success');
        
        massage.textContent = '';
        massage.appendChild(document.createTextNode('Мы вам перезвоним'));

        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    } else {
        massage.classList.add('error');
        massage.textContent = '';
        massage.appendChild(document.createTextNode(data.massage));
    }
});

document.querySelector('.exit').addEventListener('click', () => {
    order.style.transform = 'scale(0)';
});