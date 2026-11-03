
let logsDiv = document.getElementById("logs");
let barsDiv = document.getElementById("bars");

function log(msg){
  logsDiv.innerHTML += msg + "<br>";
}

async function quickSort(arr, p, r){
  if(p < r){
    let q = await partition(arr, p, r);
    log(`Partition una -> q=${q}. Dan dekata bedanawa: [p=${p} to q-1=${q-1}] saha [q+1=${q+1} to r=${r}]`);
    await quickSort(arr, p, q-1);
    await quickSort(arr, q+1, r);
  } else if(p==r){
    log(`p==r (${p}) nisa meka thamanma sorted`);
  }
}

async function partition(arr, p, r){
  let pivot = arr[r];
  let i = p - 1;
  log(`partition(p=${p}, r=${r}), pivot=arr[r]=${pivot}`);
  for(let j=p; j<r; j++){
    if(arr[j] <= pivot){
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i+1], arr[r]] = [arr[r], arr[i+1]];
  drawBars(arr);
  await new Promise(res=>setTimeout(res, 800));
  return i+1;
}

function drawBars(arr){
  barsDiv.innerHTML = "";
  arr.forEach(val=>{
    let bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = (val*15+20)+"px";
    bar.innerText = val;
    barsDiv.appendChild(bar);
  });
}

function startSort(){
  let input = document.getElementById("inputArray").value;
  let arr = input.split(",").map(Number);
  logsDiv.innerHTML = "";
  log(`Mula array eka: [${arr}], p=0, r=${arr.length-1}`);
  drawBars(arr);
  quickSort(arr, 0, arr.length-1);
}