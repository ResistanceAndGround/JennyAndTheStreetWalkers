const bookingForm=document.querySelector('#booking-form');

if(bookingForm){
  bookingForm.addEventListener('submit',async event=>{
    event.preventDefault();
    const status=bookingForm.querySelector('[role=status]');
    if(['localhost','127.0.0.1'].includes(location.hostname)||location.hostname.endsWith('.github.io')){
      status.textContent='Preview only — booking inquiries will be enabled when the site launches.';
      return;
    }
    const button=bookingForm.querySelector('button');
    button.disabled=true;
    status.textContent='Submitting…';
    try{
      const response=await fetch(location.pathname,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(bookingForm)).toString()});
      if(!response.ok)throw new Error('Submission failed');
      bookingForm.reset();
      status.textContent='Thank you! Your booking inquiry has been received.';
    }catch{
      status.textContent='We could not send your inquiry. Please try again later.';
    }finally{
      button.disabled=false;
    }
  });
}
