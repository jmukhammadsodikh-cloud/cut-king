console.log("CutKing signup.js loaded");

$(function () {
    $(".member-image").on("change", function () {
        const tile = $(this).closest(".ck-upload-tile");
        const file = this.files && this.files[0];
        if (!file) return;

        const validImageType = ["image/jpg", "image/jpeg", "image/png"];
        if (!validImageType.includes(file.type)) {
            alert("Please insert only jpeg, jpg and png!");
            $(this).val("");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            tile.find(".ck-upload-preview").attr("src", e.target.result).show();
            tile.addClass("has-image");
        };
        reader.readAsDataURL(file);
    });
});

function ckRemoveSignup(e) {
    e.preventDefault();
    e.stopPropagation();
    const tile = $(e.target).closest(".ck-upload-tile");
    tile.find("input[type='file']").val("");
    tile.find(".ck-upload-preview").attr("src", "").hide();
    tile.removeClass("has-image");
}

// FR Validation
function validateSignupForm() {
    const memberNick     = $(".member-nick").val();
    const memberPhone    = $(".member-phone").val();
    const memberPassword = $(".member-password").val();
    const confirmPass    = $(".confirm-password").val();

    if (!memberNick || !memberPhone || !memberPassword || !confirmPass) {
        alert("Please fill in all required fields!");
        return false;
    }

    if (memberPassword !== confirmPass) {
        alert("Passwords do not match!");
        return false;
    }

    if (memberPassword.length < 6) {
        alert("Password must be at least 6 characters!");
        return false;
    }

    const memberImage = $(".member-image").get(0).files[0]
        ? $(".member-image").get(0).files[0].name
        : null;

    if (!memberImage) {
        alert("Please upload a profile image!");
        return false;
    }

    return true;
}
