import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';

export default function slider () {
    window.onload = function () {
        let slider = new Swiper('.swiper-container', {
            slidesPerView: 4,
            spaceBetween: 30,
            breakpoints: {
                1600: {
                    slidesPerView: 3
                },
                1000: {
                    slidesPerView: 2
                },
                600: {
                    slidesPerView: 1
                }
            }
        });

        document.querySelector('.swiper-button-next').addEventListener('click', function(event) {
           event.preventDefault();

           slider.slideNext();
        });

        document.querySelector('.swiper-button-prev').addEventListener('click', function(event) {
            event.preventDefault();

            slider.slidePrev();
        });
    }
};