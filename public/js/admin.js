const form = document.querySelector('form');

const inputs = document.querySelector('.inputs');

document.querySelector('#add').addEventListener('click', () => {
    const element = `
            <div class="group">
                <input type="number" placeholder="цена">
                <select>
                    <option value="60 см">60 см</option>
                    <option value="90 см">90 см</option>
                    <option value="1.2 м">1.2 м</option>
                    <option value="1.5 м">1.5 м</option>
                    <option value="1.8 м">1.8 м</option>
                    <option value="2.1 м">2.1 м</option>
                    <option value="2.4 м">2.4 м</option>
                    <option value="2.7 м">2.7 м</option>
                    <option value="3 м">3 м</option>
                    <option value="4 м">4 м</option>
                    <option value="5 м">5 м</option>
                </select>
            </div>
    `;

    inputs.innerHTML += element;
});

document.querySelector('.send').addEventListener('click', async() => {
    const prices = [];
    const inputsChildren = inputs.children;
    const formData = new FormData(form);

    for(let i = 0; i < inputsChildren.length; i++) {
        prices.push({
            cost: inputsChildren[i].children[0].value,
            height: inputsChildren[i].children[1].value
        });
    }

    formData.append('title', document.querySelector('.title').value);
    formData.append('prices', JSON.stringify(prices));

    const res = await fetch('/admin/create', {
        method: 'POST',
        body: formData
    });

    const data = await res.json();

    if(data.created) {
        window.location.reload();
    }
});

const trees = document.querySelector('.trees').children;

for(let i = 0; i < trees.length; i++) {
    trees[i].children[3].addEventListener('click', async(e) => {
        
        id = e.target.parentElement.getAttribute('data-id');
        
        const res = await fetch('/admin/remove', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({id})
        });
    
        const data = await res.json();
    
        if(data.removed) window.location.reload();
    
    });
} 