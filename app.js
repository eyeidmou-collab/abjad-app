const keyboardLayout = [

['ض','ص','ث','ق','ف','غ','ع','ه','خ','ح','ج','د'],

['ش','س','ي','ب','ل','ا','ت','ن','م','ك','ط'],

['ئ','ء','ؤ','ر','لا','ى','ة','و','ز','ظ']

];

const keyboard =
document.getElementById("arabicKeyboard");

const textarea =
document.getElementById("inputText");

const toggleBtn =
document.getElementById("toggleKeyboardBtn");

/* =========================
   AFFICHER / MASQUER
========================= */

toggleBtn.addEventListener(
    "click",
    function(){

        keyboard.classList.toggle("hidden");
    }
);

/* =========================
   CONSTRUCTION CLAVIER
========================= */

keyboardLayout.forEach(row => {

    const rowDiv =
    document.createElement("div");

    rowDiv.className =
    "keyboard-row";

    row.forEach(letter => {

        const btn =
        document.createElement("button");

        btn.type = "button";

        btn.className = "key";

        btn.innerText = letter;

        btn.addEventListener(
            "click",
            function(){

                insertLetter(letter);
            }
        );

        rowDiv.appendChild(btn);
    });

    keyboard.appendChild(rowDiv);
});

/* =========================
   TOUCHES ACTIONS
========================= */

const actionsRow =
document.createElement("div");

actionsRow.className =
"keyboard-row";

/* espace */

const spaceBtn =
document.createElement("button");

spaceBtn.type = "button";

spaceBtn.className =
"key space-key";

spaceBtn.innerText =
"Espace";

spaceBtn.addEventListener(
    "click",
    function(){

        insertLetter(" ");
    }
);

actionsRow.appendChild(spaceBtn);

/* supprimer */

const deleteBtn =
document.createElement("button");

deleteBtn.type = "button";

deleteBtn.className =
"key delete-key";

deleteBtn.innerText =
"⌫";

deleteBtn.addEventListener(
    "click",
    deleteLetter
);

actionsRow.appendChild(deleteBtn);

keyboard.appendChild(actionsRow);

/* =========================
   INSERTION
========================= */

function insertLetter(letter){

    const start =
    textarea.selectionStart;

    const end =
    textarea.selectionEnd;

    textarea.value =
        textarea.value.substring(0,start)
        +
        letter
        +
        textarea.value.substring(end);

    textarea.selectionStart =
    start + letter.length;

    textarea.selectionEnd =
    start + letter.length;

    textarea.focus();

    calculate();
}

/* =========================
   SUPPRESSION
========================= */

function deleteLetter(){

    const start =
    textarea.selectionStart;

    const end =
    textarea.selectionEnd;

    if(start !== end){

        textarea.value =
            textarea.value.substring(0,start)
            +
            textarea.value.substring(end);

        textarea.selectionStart = start;
        textarea.selectionEnd = start;
    }

    else if(start > 0){

        textarea.value =
            textarea.value.substring(0,start - 1)
            +
            textarea.value.substring(end);

        textarea.selectionStart = start - 1;
        textarea.selectionEnd = start - 1;
    }

    textarea.focus();

    calculate();
}

/* =========================
   TABLES ABJAD
========================= */

const ABJAD_MASHRIQI = {

'ا':1,'أ':1,'إ':1,'آ':1,
'ب':2,
'ج':3,
'د':4,
'ه':5,
'ة':5,
'و':6,
'ز':7,
'ح':8,
'ط':9,
'ي':10,
'ى':10,
'ئ':10,
'ك':20,
'ل':30,
'م':40,
'ن':50,
'س':60,
'ع':70,
'ف':80,
'ص':90,
'ق':100,
'ر':200,
'ش':300,
'ت':400,
'ث':500,
'خ':600,
'ذ':700,
'ض':800,
'ظ':900,
'غ':1000

};

const ABJAD_MAGHRIBI = {

'ا':1,'أ':1,'إ':1,'آ':1,
'ب':2,
'ج':3,
'د':4,
'ه':5,
'ة':5,
'و':6,
'ز':7,
'ح':8,
'ط':9,
'ي':10,
'ى':10,
'ئ':10,
'ك':20,
'ل':30,
'م':40,
'ن':50,
'ص':60,
'ع':70,
'ف':80,
'ض':90,
'ق':100,
'ر':200,
'س':300,
'ت':400,
'ث':500,
'خ':600,
'ذ':700,
'ظ':800,
'غ':900,
'ش':1000

};

/* =========================
   CALCUL
========================= */

function calculate(){

    const text =
    textarea.value;

    const mode =
    document.querySelector(
        'input[name="mode"]:checked'
    ).value;

    const abjad =
    mode === "maghribi"
    ? ABJAD_MAGHRIBI
    : ABJAD_MASHRIQI;

    let total = 0;

    for(let char of text){

        if(abjad[char]){

            total += abjad[char];
        }
    }

    document.getElementById(
        "totalValue"
    ).innerText = total;
}

/* =========================
   SAISIE CLAVIER NORMAL
========================= */

textarea.addEventListener(
    "input",
    calculate
);

/* =========================
   CHANGEMENT MODE
========================= */

document
.querySelectorAll('input[name="mode"]')
.forEach(radio => {

    radio.addEventListener(
        "change",
        calculate
    );
});