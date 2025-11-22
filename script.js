let lang='en';

const products=[
  {nameEn:"full_bloody", nameAr:"فل بولدي", price:"700.00MAD", img:"images/full_booldy1.png", category:"palestinian_stuff"},
  {nameEn:"up_bloody", nameAr:"أب بولدي", price:"400.00MAD", img:"images/up_bloody_dark2.png", category:"palestinian_stuff"},
];

const container=document.getElementById('shopContainer');
const categoryButtons=document.querySelectorAll('#categoryFilter button');
const darkModeToggle=document.getElementById('darkModeToggle');
const langToggle=document.getElementById('langToggle');
const detailSection=document.getElementById('productDetail');
const detailName=document.getElementById('detailName');
const detailImg=document.getElementById('detailImg');
const detailPrice=document.getElementById('detailPrice');
const detailOrder=document.getElementById('detailOrder');
const backBtn=document.getElementById('backBtn');
const homeIcon=document.getElementById('homeIcon');

function displayProducts(category='all'){
  container.innerHTML='';
  const filtered = category==='all'?products:products.filter(p=>p.category===category);
  filtered.forEach((p,i)=>{
    const item=document.createElement('div');
    item.classList.add('item');
    item.style.animationDelay=(i*0.2)+'s';
    const name=lang==='en'?p.nameEn:p.nameAr;
    item.innerHTML=`<img src="${p.img}"><h3>${name}</h3><p>Price: ${p.price}</p>`;
    item.onclick=()=>{
      detailName.textContent=name;
      detailImg.src=p.img;
      detailPrice.textContent=`Price: ${p.price}`;
      detailOrder.href=`https://wa.me/212665299977?text=Hi! I want this ${encodeURIComponent(name)}`;
      container.style.display='none';
      detailSection.classList.add('show');
    };
    container.appendChild(item);
  });
}

categoryButtons.forEach(btn=>{
  btn.onclick=()=>{
    categoryButtons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    displayProducts(btn.dataset.category);
    detailSection.classList.remove('show');
    container.style.display='flex';
  };
});

darkModeToggle.onclick=()=>{
  document.body.classList.toggle('light');
  document.body.classList.toggle('dark');
  darkModeToggle.textContent = document.body.classList.contains('light') ? 'Dark Mode' : 'Light Mode';
};

langToggle.onclick=()=>{
  lang = lang==='en'?'ar':'en';
  displayProducts(document.querySelector('.active').dataset.category);
  categoryButtons.forEach(btn=>{
    btn.textContent = lang==='en'?btn.dataset.nameEn:btn.dataset.nameAr;
  });
};

backBtn.onclick=()=>{
  detailSection.classList.remove('show');
  container.style.display='flex';
};

homeIcon.onclick=()=>{
  detailSection.classList.remove('show');
  container.style.display='flex';
  displayProducts('all');
};

displayProducts();
