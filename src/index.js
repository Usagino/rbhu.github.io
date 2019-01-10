import Vue from 'vue';
import magazine from './components/magazine.vue';

new Vue({
  el: "#contents",
  components: {
    'magazine':magazine
  },
});

let $ = require('jquery');


$(()=>{
  let pos_y = window.pageYOffset;
  let $ = require('jquery');

  let right = [];
  let left = [];
  let image_pos = [];
  $(() => {
    let content_len = $(`.magazine__slot > *`).length;
    console.log(`要素の数は、${content_len}`);

    for (let i = 1; i < content_len; i++) {
      let text_figure = $(`.magazine__slot :nth-child(${i})`).prop('outerHTML');
      if ($(`.magazine__slot :nth-child(${i}) img`).length) {
        console.log("これは画像");
        right.push(text_figure);
      } else {
        console.log("これはテキスト");
        left.push(text_figure);
      }
    }

    console.log(right);
    console.log(left);

    left.forEach((i) => {
      $('.magazine__left__text').append(i);
    });

    $(window).on('scroll', () => {
      let pos = $(window).scrollTop();
    });
    $(".magazine__right__wrap").append(
      right[0]
    );

    $(window).scroll(() => {
      pos_y = window.pageYOffset;
      console.log(pos_y);

    });
    let top_off;
    let top_off_length = left.length;
    top_off = $(`.magazine__left__text:nth-child(1)`).offset().top;
    console.log(top_off);
    for (let i = 1; i <= left.length; i++) {
      top_off = $(`.magazine__left__text:nth-child(${i})`).offset();
      console.log(top_off);
    }
  });
});
