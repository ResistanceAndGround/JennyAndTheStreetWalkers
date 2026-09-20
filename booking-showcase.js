const bookingShowcase=document.querySelector('.booking-showcase');

if(bookingShowcase){
  if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    bookingShowcase.classList.add('is-revealed');
  }else{
    bookingShowcase.classList.add('is-enhanced');
    const showcaseObserver=new IntersectionObserver(entries=>{
      if(entries.some(entry=>entry.isIntersecting)){
        bookingShowcase.classList.add('is-revealed');
        showcaseObserver.disconnect();
      }
    },{threshold:.3});
    showcaseObserver.observe(bookingShowcase);
  }
}
