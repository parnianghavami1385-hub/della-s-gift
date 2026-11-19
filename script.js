
// ----------------------------------
// 1. MEMORY SETTINGS
// ----------------------------------

const memories = [
    {
        image: "images/photo1.jpg",
        question: "کلاس چندم بودیم که از این طرف کلاس به اون طرف کلاس به هم نامه میدادیم و دوستیمون رو شروع کردیم؟",
        answer: "دوم"
    },
    {
        image: "images/photo2.jpg",
        question: "تنها جایی که هر روز همدیگه رو توش میدیدم؟",
        answer: "شفاعت"
    },
    {
        image: "images/photo3.jpg",
        question: "اولین کراش مشترکمون",
        answer: "امیر کاظمی"
    },
    {
        image: "images/photo4.jpg",
        question: "پاساژی که باهم توش چرخیدیم؟",
        answer: "اندیشه"
    },
    {
        image: "images/photo5.jpg",
        question: "سریالی که با هم جینگیلیش رو درست کردیم؟",
        answer: "ملکه اشک ها"
    },
    {
        image: "images/photo6.jpg",
        question: "اولین سریال کره ای که دیدیم و بدبختمون کرد؟",
        answer: "هوارانگ"
    },
    {
        image: "images/photo7.jpg",
        question: "کنسرت کی با هم رفتیم؟",
        answer: "فرزاد فرزین"
    },
    {
        image: "images/photo8.jpg",
        question: "آخرین تولدم که پیشم بودی چند سالم شد؟",
        answer: "18"
    },
    {
        image: "images/photo9.jpg",
        question: "تک پسر مامانش و خاله ش",
        answer: "لیام"
    },
    {
        image: "images/photo10.jpg",
        question: "مراسمی که آخرین بار همدیگه رو دیدیم",
        answer: "گودبای پارتی"
    }
];


// ----------------------------------
// 2. PAGE ELEMENTS
// ----------------------------------

const welcomePage = document.getElementById("welcome");
const memoriesPage = document.getElementById("memories");
const birthdayPage = document.getElementById("birthday");
const letterPage = document.getElementById("letter");

const openButton = document.getElementById("openButton");
const birthdayButton = document.getElementById("birthdayButton");
const letterButton = document.getElementById("letterButton");


// ----------------------------------
// 3. PAGE NAVIGATION
// ----------------------------------

function showPage(page) {
    welcomePage.classList.add("hidden");
    memoriesPage.classList.remove("active");
    birthdayPage.classList.remove("active");
    letterPage.classList.remove("active");

    page.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

openButton.addEventListener("click", function() {
    showPage(memoriesPage);
    updateCounter();
});

birthdayButton.addEventListener("click", function() {
    showPage(birthdayPage);
});

letterButton.addEventListener("click", function() {
    showPage(letterPage);
});


// ----------------------------------
// 4. FRIENDSHIP COUNTER
// ----------------------------------

function updateCounter() {
    const friendshipDate = new Date(2014, 8, 23);
    const today = new Date();

    friendshipDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const difference = today - friendshipDate;

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    document.getElementById("daysCounter").textContent =
        days.toLocaleString("en-US");
}


// ----------------------------------
// 5. MEMORY POPUP
// ----------------------------------

const popup = document.getElementById("memoryPopup");
const popupQuestion = document.getElementById("popupQuestion");
const popupAnswer = document.getElementById("popupAnswer");
const popupMessage = document.getElementById("popupMessage");

const submitAnswer = document.getElementById("submitAnswer");
const closePopup = document.getElementById("closePopup");

let selectedPolaroid = null;
let selectedMemory = null;


// ----------------------------------
// 6. CLICK ON POLAROID
// ----------------------------------

document.querySelectorAll(".polaroid").forEach((polaroid) => {

    const placeholder = polaroid.querySelector(".photo-placeholder");

    placeholder.addEventListener("click", () => {

        if (polaroid.classList.contains("is-unlocked")) {
            return;
        }

        const index = Number(polaroid.dataset.memory);

        selectedPolaroid = polaroid;
        selectedMemory = memories[index];

        popupQuestion.textContent = selectedMemory.question;

        popupAnswer.value = "";
        popupMessage.textContent = "";

        popup.hidden = false;

        popupAnswer.focus();
    });

});


// ----------------------------------
// 7. CHECK ANSWER
// ----------------------------------

function checkMemoryAnswer() {

    if (!selectedMemory || !selectedPolaroid) return;

    const userAnswer = popupAnswer.value
        .trim()
        .toLowerCase();

    const correctAnswer = selectedMemory.answer
        .trim()
        .toLowerCase();

    if (userAnswer === correctAnswer) {

        const placeholder =
            selectedPolaroid.querySelector(".photo-placeholder");

        const photo = document.createElement("img");

        photo.src = selectedMemory.image;
        photo.alt = "Our memory";

        photo.onload = () => {

            placeholder.replaceChildren(photo);

            selectedPolaroid.classList.add("is-unlocked");

            popup.hidden = true;

        };

        photo.onerror = () => {
            popupMessage.textContent =
                "Couldn't load the photo. Check its filename ♡";
        };

    } else {

        popupMessage.textContent = "Not quite! Try again ♡";

        popupAnswer.value = "";
        popupAnswer.focus();

    }
}


// ----------------------------------
// 8. POPUP BUTTONS
// ----------------------------------

submitAnswer.addEventListener("click", checkMemoryAnswer);

popupAnswer.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        checkMemoryAnswer();
    }

});

closePopup.addEventListener("click", () => {
    popup.hidden = true;
});

popup.addEventListener("click", (event) => {

    if (event.target === popup) {
        popup.hidden = true;
    }

});
// IMAGE LIGHTBOX

const imageViewer = document.getElementById("imageViewer");
const expandedImage = document.getElementById("expandedImage");
const closeImageViewer = document.getElementById("closeImageViewer");

// Listen for clicks on the memory wall
document.getElementById("memoryWall").addEventListener("click", function(event) {

    const photo = event.target.closest(".polaroid.is-unlocked img");

    if (!photo) return;

    expandedImage.src = photo.src;
    imageViewer.hidden = false;

});

// Close button
closeImageViewer.addEventListener("click", function() {
    imageViewer.hidden = true;
});

// Click outside the image
imageViewer.addEventListener("click", function(event) {
    if (event.target === imageViewer) {
        imageViewer.hidden = true;
    }
});
function openImage(src) {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-image");

    modalImg.src = src;
    modal.style.display = "flex";
}

function closeImage() {
    document.getElementById("image-modal").style.display = "none";
}