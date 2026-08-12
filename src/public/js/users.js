console.log("CutKing users.js loaded");

$(function () {
    $(".member-status").on("change", function (e) {
        const id = e.target.id;
        const memberStatus = $(`#${id}.member-status`).val();

        axios
            .post("/admin/user/edit", { _id: id, memberStatus })
            .then((response) => {
                const result = response.data;
                if (result.data) {
                    $(`#${id}.member-status`)
                        .attr("class", `ck-pill-select member-status st-${memberStatus.toLowerCase()}`)
                        .blur();

                    const row = $(`#${id}`).closest("tr");
                    row.css("background", "#FFF0EE");
                    setTimeout(() => row.css("background", ""), 800);
                } else {
                    alert("User update failed!");
                }
            })
            .catch((err) => {
                console.log(err);
                alert("User update failed!");
            });
    });
});