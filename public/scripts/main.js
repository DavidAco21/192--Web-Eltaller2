
    var btn = document.querySelector('.header__btn');
    var nav = document.querySelector('.header__global');
    var button = document.querySelector('.button--right');
    var slider = document.querySelector('.slider');
    var tape = slider.querySelector('.slider__tape');
    var count = 0;
    
  
        
    var first = tape.querySelector('.slider__img');
    var newLast = document.createElement('img');
    newLast.setAttribute('src', first.getAttribute('src'));
    newLast.setAttribute('class', first.getAttribute('class'));
    newLast.classList.add('slider__img');
    tape.append(newLast);
  
    function handleLast(){
        console.log('cambio');
        tape.classList.add('slider__tape--inactive');
        tape.style.transform = 'translate(0px, 0px)';
    }

    function handleClick(event) {
        console.log(event);
        nav.classList.toggle('mainheader__nav--active');
        
        count++;
    
        if(count == 1){
            tape.classList.remove('slider__tape--inactive');
        }
    
        var mov = slider.offsetWidth * -1 * count;
        tape.style.transform = 'translate(' + mov + 'px, 0px)';
        
        if(count > tape.childElementCount - 5){
            setTimeout(handleLast, 100);
            count = 0;
        }
        
    }

    button.addEventListener('click', handleClick);
    btn.addEventListener('click', handleClick);
    

