
// import './slider.js'


let modalState = {}; // form-calculator2


//modals 
// const modals = () =>{
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]')

              trigger.forEach(i=>{
                i.addEventListener('click', (e)=>{
            
                    if(e.target){
                        e.preventDefault();
                    };

                    windows.forEach(item=>{
                        item.style.display = 'none';
                    });
    
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    // clearInterval(showModalByTime('.popup', 60000))
                });
              })  

        close.addEventListener('click', (e)=>{
            windows.forEach(item=>{
                item.style.display = 'none';
            });

            modal.style.display = 'none';
            document.body.style.overflow = '';
        });

        modal.addEventListener('click', (e)=>{
                // if(e.target.classList.contains('popup_engineer')){
                    if(e.target === modal && closeClickOverlay){

                        windows.forEach(item=>{
                            item.style.display = 'none';
                        });

                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }
        });
    }
    function showModalByTime(selector, time){
        const popUpModal = setTimeout(() => {
            console.log(666);
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = '';
        },time);
    };
    showModalByTime('.popup', 60000); 
    
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close'); 
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);


// }

//tabs 
function tabs(headerSelector, tabSelector, contentSelector,activeClass, display = 'block'){

    const header = document.querySelector(headerSelector);
    const tab = document.querySelectorAll(tabSelector);
    const content = document.querySelectorAll(contentSelector);
    // const header = document.querySelector(activeClass);

    const hideTabContent = () =>{
        content.forEach(item =>{
              item.style.display = 'none';
        });

        tab.forEach(item=>{
            item.classList.remove(activeClass);
        })
    }

    const showTabContent = (i = 0) =>{
        content[i].style.display = display; // display = 'block'

        tab[i].classList.add(activeClass);
    }
    hideTabContent();
    showTabContent();

    header.addEventListener('click', (e)=>{
        // if(e.target === tab){
        if(e.target && (e.target.classList.contains(tabSelector.replace(/\./,'')) || // reg exp
            e.target.parentNode.classList.contains(tabSelector.replace(/\./,'')))){ // reg exp
                tab.forEach((item, index)=>{
                // item.addEventListener('click', (e)=>{
                    // if(e.target.classList.contains('no_click')){
                    if(e.target == item || e.target.parentNode == item){    
                        hideTabContent();
                        showTabContent(index);
                    }
                // })
                });
        }
    })  
}
tabs('.glazing_slider', '.glazing_block','.glazing_content', 'active');
tabs('.decoration_slider', '.no_click','.decoration_content > div > div', 'after_click');
tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');
// tabs();

// post forms 
function forms(state){

    const form = document.querySelectorAll('form');
    const input = document.querySelectorAll('input');
    
    
    // const phoneInputs = document.querySelectorAll('input[name="user_phone"]');
    //     phoneInputs.forEach(item=>{
    //         item.addEventListener('input', ()=>{
    //             item.value = item.value.replace(/\D/, '');
    //         });
    //     });
    checkNumInputs('input[name="user_phone"]')

    const message = {
        loading: 'Loading...',
        success: 'Thank You! We will call you back shortly.',
        failure: 'something went wrong'
    };
    
    form.forEach(item=>{
        item.addEventListener('submit', (e)=>{
            e.preventDefault(); 
           
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.append(statusMessage);

            const formData = new FormData(item);
            if(item.getAttribute('data-calc') === 'end'){
                    for(let key in state ){
                        formData.append(key, state[key]);
                    }
            }

            const postData = async (url, data) =>{
                // document.querySelector('.status').textContent = message.loading;
                statusMessage.textContent = message.loading;

                let res  = await fetch(url, {
                    method: 'POST',
                    body: data
                });

                return await res.text();
            };
            // const clearInputs = () =>{
            //     input.forEach(item=>{
            //         item.value = '';
            //     })
            // }
                postData('assets/server.php', formData)
                    .then(res =>{
                        console.log(res);
                        statusMessage.textContent = message.success;
                    }).catch(()=>{
                        statusMessage.textContent = message.failure;
                    }).finally(() =>{
                        item.reset();
                        // clearInputs();
                        setTimeout(()=>{
                            statusMessage.remove();
                        },5000);
                    });
        });
    });
} 
forms(modalState);



// form-calculator1
// form-calculator2

function changeModalState(state){

    const windowForm = document.querySelectorAll('.balcon_icons_img');
    const windowWidth = document.querySelectorAll('#width');
    const windowHeight = document.querySelectorAll('#height');
    const windowType = document.querySelectorAll('#view_type');
    const windowProfile = document.querySelectorAll('.checkbox');

    checkNumInputs('#width');
    checkNumInputs('#height');

    function bindActionToElems(event, elem, prop){
        elem.forEach((item, i)=>{
            item.addEventListener(event, ()=>{

                switch(item.nodeName){
                    case 'SPAN':
                        // console.log('span');
                        state[prop] = i;
                        break;
                    case 'INPUT':
                        if(item.getAttribute('type') === 'checkbox'){
                            // console.log('checkbox');
                            i === 0 ? state[prop] = 'Холодное' : state[prop] = 'Теплое';
                            elem.forEach((box, j)=>{
                                box.checked = false;
                                if(i == j){
                                    box.checked = true;
                                }
                            });
                        }else{
                            // console.log('input');
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT':   
                        // console.log('select');
                        state[prop] = item.value;
                        break;
                }
                console.log(state);
                // if(elem.length > 1){
                //     state[prop] = i;
                // }else{
                //     state[prop] = item.value;
                // }
                // console.log(state);
            });
        });
    };
    bindActionToElems('click', windowForm, 'form');
    bindActionToElems('input', windowHeight, 'height');
    bindActionToElems('input', windowWidth, 'width');
    bindActionToElems('change', windowType, 'type');
    bindActionToElems('change', windowProfile, 'profile');
};
changeModalState(modalState);


function checkNumInputs(selector){
    // const phoneInputs = document.querySelectorAll('input[name="user_phone"]');
    const phoneInputs = document.querySelectorAll(selector);
    phoneInputs.forEach(item=>{
        item.addEventListener('input', ()=>{
            item.value = item.value.replace(/\D/, '');
        });
    });
}

// timer 

function getTimeRemaining(endTime){
    const t = Date.parse(endTime) - Date.parse(new Date());
    const days = Math.floor(t/(1000 * 60 * 60 * 24));
    const hours = Math.floor(t/(1000 * 60 * 60 )%24);
    const minutes = Math.floor(t/(1000 * 60 )%60);
    const seconds = Math.floor(t/(1000)%60);
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
};

function setClock(selector, endTime){
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');

    updateClock()
    const timeInterval = setInterval(updateClock, 1000);

    function updateClock(){
        const t = getTimeRemaining(endTime);

        days.textContent = getZero(t.days);
        hours.textContent = getZero(t.hours);
        minutes.textContent = getZero(t.minutes);
        seconds.textContent = getZero(t.seconds);

        if(t.total <= 0){
            days.textContent = '00';
            hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';
            clearInterval(timeInterval);
        }
    }
};
let deadline =  '2021-12-31';
setClock('.container1', deadline);

function getZero(n){
    return (n < 10) ? '0' + n : n;
};


// images

const imgPopup = document.createElement('div');
const workSection = document.querySelector('.works');
const bigImage = document.createElement('img');

imgPopup.classList.add('popup');
imgPopup.style.justifyContent = 'center';
imgPopup.style.alignItems = 'center';

imgPopup.append(bigImage);
workSection.append(imgPopup);

workSection.addEventListener('click', (e)=>{
    e.preventDefault();

    let target = e.target;

    if(target && target.classList.contains('preview')){
        imgPopup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        const path = target.parentNode.getAttribute('href');
        bigImage.setAttribute('src', path);

    }

    if(target && target.matches('div.popup')){
        imgPopup.style.display = 'none';
        document.body.style.overflow = '';
    }
})
