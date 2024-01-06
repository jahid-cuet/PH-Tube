
const fetchData = async (config) => {
    try {
        const res = await fetch(config);
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

const div = document.getElementById('div');
const elements = document.getElementById('img');
const sortByViewsBtn = document.getElementById('sortByViewsBtn');

let lastClickedButton = null;

const loadData = async () => {
    try {
        const data = await fetchData('https://openapi.programming-hero.com/api/videos/categories');

        data.data.forEach((d, index) => {
            const element = document.createElement('div');
            element.classList.add('bdr');

            const button = document.createElement('button');
            button.type = 'button';
            button.classList.add('btn', 'btn-primary');
            button.setAttribute('data-bs-target', '#exampleModal');
            button.innerText = d.category;

            button.onclick = () => {
                displayBtn(d.category_id, button);
            };

            element.appendChild(button);
            div.appendChild(element);

            // Show the first category's data by default
            if (index === 0) {
                displayBtn(d.category_id, button);
            }
        });
    } catch (error) {
        console.error('Error loading data:', error);
    }
};

const displayBtn = async (id, clickedButton) => {
    try {
        // Clear existing images
        elements.innerHTML = '';

        // Change background color of the clicked button
        if (lastClickedButton) {
            lastClickedButton.style.backgroundColor = ''; // Revert previous button color
        }
        clickedButton.style.backgroundColor = 'lightblue'; // Set clicked button color
        lastClickedButton = clickedButton;

        const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
        const data = await res.json();

        if (!data || !data.data || data.data.length === 0) {
            const noDataElement = document.createElement('div');
            noDataElement.classList.add('no-data');
            noDataElement.innerHTML = `
                <img src="Icon.png" alt="icon">
                <h3 class='pt-3'>Oops!! Sorry, There is no content here</h3>
            `;
            elements.appendChild(noDataElement);
            return;
        }

        data.data.forEach(d => {
            const element = document.createElement('div');
            element.classList.add('im');

            const isVerified = d.authors[0].verified === true || d.authors[0].verified === 'true';
            const verificationIcon = isVerified ? '<i class="fa-solid fa-certificate"></i>' : '';
            const post=d.others.posted_date;
            element.innerHTML = `
                <img src="${d.thumbnail} ${post}" alt="thumbnail">
                <div class='flex'> 
                    <img class='authorImg' src="${d.authors[0].profile_picture}" alt="pp">
                    <div class='ta'>
                        <h5>${d.title}</h5>
                        <p>${d.authors[0].profile_name} ${verificationIcon}</p> 
                        <p>${d.others.views} views</p>
                       
                    </div>
                </div>      
            `;
            elements.appendChild(element);
        });
    } catch (error) {
        console.error('Error displaying buttons:', error);
        console.log('Error displaying buttons');
    }
};











// Sorted data

sortByViewsBtn.addEventListener('click', () => {
    div.innerHTML = '';
        viewloadData(); // Pass true to indicate sorting by views
    });




    const viewloadData = async () => {
        try {
            const data = await fetchData('https://openapi.programming-hero.com/api/videos/categories');
    

    
            data.data.forEach(d => {
                const element = document.createElement('div');
                element.classList.add('bdr');
    
                const button = document.createElement('button');
                button.type = 'button';
                button.classList.add('btn', 'btn-primary');
                button.setAttribute('data-bs-target', '#exampleModal');
                button.innerText = d.category;
    
                button.onclick = () => {
                    viewdisplayBtn(d.category_id, button);
                };
    
                element.appendChild(button);
                div.appendChild(element);
            });
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };
    
    const viewdisplayBtn = async (id, clickedButton) => {
        try {
            // Clear existing images
            elements.innerHTML = '';
    
            // Change background color of the clicked button
            if (lastClickedButton) {
                lastClickedButton.style.backgroundColor = ''; // Revert previous button color
            }
            clickedButton.style.backgroundColor = 'lightblue'; // Set clicked button color
            lastClickedButton = clickedButton;
    
            const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
            const data = await res.json();
    
            if (!data || !data.data || data.data.length === 0) {
                const noDataElement = document.createElement('div');
                noDataElement.classList.add('no-data');
                noDataElement.innerHTML = `
                    <img src="Icon.png" alt="icon">
                    <h3 class='pt-3'>Oops!! Sorry, There is no content here</h3>
                `;
                elements.appendChild(noDataElement);
                return;
            }
            data.data.sort((a, b) => parseInt(b.others.views) - parseInt(a.others.views));
            data.data.forEach(d => {

                console.log(d.others.views);
                const element = document.createElement('div');
                element.classList.add('im');
    
                const isVerified = d.authors[0].verified === true || d.authors[0].verified === 'true';
                const verificationIcon = isVerified ? '<i class="fa-solid fa-certificate"></i>' : '';
    



                element.innerHTML = `
                    <img src="${d.thumbnail}" alt="">
                    <div class='flex'> 
                        <img class='authorImg' src="${d.authors[0].profile_picture}" alt="">
                        <div class='ta'>
                            <h5>${d.title}</h5>
                            <p>${d.authors[0].profile_name} ${verificationIcon}</p> 
                            <p>${d.others.views} views</p>
                        </div>
                    </div>      
                `;
                elements.appendChild(element);
            });
        } catch (error) {
            console.error('Error displaying buttons:', error);
            console.log('Error displaying buttons');
        }
    };
    
    
    
    loadData()

// //   THis is for Blog Button









