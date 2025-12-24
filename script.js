const questions = [
  { q:"Bleeding in early pregnancy can be caused by ectopic pregnancy.", a:true },
  { q:"A vesicular mole is listed as a cause of bleeding in early pregnancy.", a:true },
  { q:"Decidual bleeding commonly occurs throughout the entire pregnancy.", a:false },
  { q:"Abortion is defined as loss of pregnancy before the end of the 24th week.", a:true },
  { q:"Fetal viability is the ability of the fetus to live outside the uterus with medical support such as an incubator.", a:true },
  { q:"Fetal viability thresholds are the same across the USA, UK, and developing countries.", a:false },
  { q:"Fetal maturity without medical aid is defined as equal to 37 weeks.", a:true },
  { q:"Anemia and poor nutrition are among general maternal causes of abortion.", a:true },
  { q:"Hypertension and infections are mentioned as maternal general causes of abortion.", a:true },
  { q:"Cervical incompetence is listed under local maternal causes of abortion.", a:true },
  { q:"Uterine fibroids are included as congenital abnormalities of the uterus.", a:false },
  { q:"Trisomy is an example of a numerical chromosomal abnormality linked to fetal causes of abortion.", a:true },
  { q:"Monosomy (45 XO) is described as less common than trisomy.", a:true },
  { q:"Paternal causes such as abnormal sperm are not mentioned as contributing to abortion.", a:false },
  { q:"Threatened abortion is bleeding into the chorio-decidual space that is not sufficient to kill the embryo.", a:true },
  { q:"In threatened abortion, the cervix is soft and closed on pelvic examination.", a:true },
  { q:"Ultrasound is unnecessary for determining fetal viability in threatened abortion.", a:false },
  { q:"Bed rest for threatened abortion is presented as an uncontroversial standard.", a:false },
  { q:"Inevitable abortion is defined as a process that cannot be stopped and will occur.", a:true },
  { q:"Severe vaginal bleeding in inevitable abortion may lead to hypovolemic shock.", a:true },
  { q:"Management of inevitable abortion includes hospitalization and evacuation of uterine contents.", a:true },
  { q:"Incomplete abortion means all products of conception have been expelled.", a:false },
  { q:"Ultrasound is important to detect retained products in incomplete abortion.", a:true },
  { q:"Complete abortion typically presents with absent pain, slight bleeding, and a closed cervix.", a:true },
  { q:"After a complete abortion, follow-up ultrasound may be used to confirm the uterine cavity is empty.", a:true },
  { q:"Septic abortion is defined as abortion combined with infection of uterine contents.", a:true },
  { q:"Staphylococcus aureus and E. coli are among common organisms in septic abortion.", a:true },
  { q:"Clostridium welchii may cause gas gangrene in septic abortion.", a:true },
  { q:"Routes of infection in septic abortion include exogenous, endogenous, and autogenous routes.", a:true },
  { q:"Complications of septic abortion may include pelvic peritonitis and acute renal failure.", a:true },
  { q:"Disseminated intravascular coagulation (DIC) is a possible complication of septic abortion.", a:true },
  { q:"Management of septic abortion always avoids antibiotics and focuses only on evacuation.", a:false },
  { q:"Missed abortion is defined as fetal death inside the uterus with failure of expulsion.", a:true },
  { q:"One complication of missed abortion is hypofibrinogenemia with risk of DIC.", a:true },
  { q:"Pregnancy tests may become negative 10–15 days after fetal death in missed abortion.", a:true },
  { q:"Missed abortion always resolves spontaneously without risk.", a:false },
  { q:"Recurrent abortion is defined as three or more successive spontaneous abortions.", a:true },
  { q:"Primary recurrent abortion refers to cases with no previous full-term deliveries.", a:true },
  { q:"Secondary recurrent abortion indicates a history of previous full-term deliveries.", a:true },
  { q:"The causes of recurrent abortion are different from causes of isolated abortion.", a:false }
];

let index=0;
let answered=false;
let results=[];

const qText=document.getElementById("questionText");
const counter=document.getElementById("counter");
const trueBtn=document.getElementById("trueBtn");
const falseBtn=document.getElementById("falseBtn");
const nextBtn=document.getElementById("nextBtn");
const retryBtn=document.getElementById("retryBtn");
const qList=document.getElementById("questionsList");

function toggleMenu(){
  const m=document.getElementById("sideMenu");
  const o=document.getElementById("overlay");
  if(m.style.right==="0px"){m.style.right="-250px";o.style.display="none";}
  else{m.style.right="0";o.style.display="block";}
}

function startQuiz(){
  shuffle();
  index=0;
  results=Array(questions.length).fill(null);
  document.getElementById("home").style.display="none";
  document.getElementById("quiz").style.display="block";
  document.querySelector(".options").style.display="flex";
  document.getElementById("questionsBtn").style.display="block";
  retryBtn.style.display="none";
  loadQuestion();
}

function loadQuestion(){
  answered=false;
  trueBtn.style.background="#3498db";
  falseBtn.style.background="#3498db";
  nextBtn.style.display="none";
  counter.innerText=`Question ${index+1} / ${questions.length}`;
  qText.innerText=questions[index].q;
}

function answer(val){
  if(answered) return;
  answered=true;
  const correct=questions[index].a;
  results[index]=(val===correct);

  if(val===correct){
    (val?trueBtn:falseBtn).style.background="#27ae60";
  }else{
    (val?trueBtn:falseBtn).style.background="#e74c3c";
    (correct?trueBtn:falseBtn).style.background="#27ae60";
  }

  if(results.every(r=>r!==null)){
    finishQuiz();
  }else{
    nextBtn.style.display="inline-block";
  }
}

function nextQuestion(){
  index = results.findIndex((r,i)=>r===null && i>index);
  if(index===-1){
    index = results.findIndex(r=>r===null);
  }
  loadQuestion();
}

function finishQuiz(){
  qText.innerText=`✅ Finished — Score: ${results.filter(r=>r).length} / ${questions.length}`;
  document.querySelector(".options").style.display="none";
  document.getElementById("questionsBtn").style.display="none";
  nextBtn.style.display="none";
  retryBtn.style.display="inline-block";
}

function retryQuiz(){
  startQuiz();
}

function toggleQuestions(){
  qList.innerHTML="";
  qList.style.display=qList.style.display==="block"?"none":"block";
  results.forEach((r,i)=>{
    const d=document.createElement("div");
    d.className="q-item "+(r===true?"correct":r===false?"wrong":"unanswered");
    d.innerText=i+1;
    d.onclick=()=>{
      index=i;
      loadQuestion();
      qList.style.display="none";
    };
    qList.appendChild(d);
  });
}

function shuffle(){
  questions.sort(()=>Math.random()-0.5);
}