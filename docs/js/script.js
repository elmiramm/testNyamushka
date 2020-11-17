function testWebP(callback) {
   var webP = new Image();
   webP.onload = webP.onerror = function() {
      callback(webP.height == 2);
   }
   webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

if (support == true) {
   document.querySelector('body').classList.add('webp');
}
else{
   document.querySelector('body').classList.add('no-webp');
}
});

function closestItemByClass (item, className) {
   var node = item;
   while(node) {
      if(node.classList.contains(className)) {
         return node;
      }
      node = node.parentElement;
   }
   return null;
}

(function addIsActiveToProduct (){
   var catalog = document.querySelector('.catalog');
   
   if(catalog === null) {
      return;
   }
   var footerTextDefault = 'Чего сидишь? Порадуй котэ, ';
   
   window.addEventListener('load', function() {
      var productBodyIsActive = catalog.querySelectorAll('.product__body.is-active');
      if (productBodyIsActive === null) {
         return;
      }
      for(var i = 0; i < productBodyIsActive.length; i += 1) {
         var current = productBodyIsActive [i];
         var dataTextInFooter = current.getAttribute('data-text-in-footer');
         var catalogItem = closestItemByClass(current, 'catalog__item');
         var footerText = catalogItem.querySelector('.product__info');

         footerText.textContent = dataTextInFooter;
      }
   })
   
   catalog.addEventListener('click', function(e){
      var target = e.target;

      var item = closestItemByClass(target, 'product__body');
      
      if(item !== null) {
         if(item.classList.contains('is-disabled')){
            return;
         }
      } 
      
      if(item === null) {
         item = closestItemByClass(target, 'buy');

         if(item === null) {
            return;
         }
         item = closestItemByClass(target, 'product__footer');

         item = item.previousElementSibling;
      }
      
      e.preventDefault();

      item.classList.toggle('is-active');

      var dataTextInFooter = item.getAttribute('data-text-in-footer');
      var catalogItem = closestItemByClass(target, 'catalog__item');
      var footerText = catalogItem.querySelector('.product__info');

      if (item.classList.contains('is-active')) {
         footerText.textContent = dataTextInFooter;
      }
      else {
         footerText.textContent = footerTextDefault;

         footerText.innerHTML = footerText.textContent + '<span class = "buy">купи</span>';
      }
   })
}) ();

(function addDisabledFooterText (){
   
   var catalog = document.querySelector('.catalog');
   
   if(catalog === null) {
      return;
   }
   
   window.addEventListener('load', function() {
      var productBodyIsDisabled = catalog.querySelectorAll('.product__body.is-disabled');
      if (productBodyIsDisabled === null) {
         return;
      }
      for(var i = 0; i < productBodyIsDisabled.length; i += 1) {
         var current = productBodyIsDisabled [i];
         var dataTextIsDisabled = current.getAttribute('data-text-is-disabled');
         var catalogItem = closestItemByClass(current, 'catalog__item');
         var disabledText = catalogItem.querySelector('.product__info');

         disabledText.textContent = dataTextIsDisabled;
      }
   })
   
}) ();