console.log("CutKing masters.js loaded");

$(function () {
    $(".master-status").on("change", function (e) {
        const id = e.target.id;
        const memberStatus = $(`#${id}.master-status`).val();

        axios
            .post(`/admin/master/${id}`, { memberStatus })
            .then((response) => {
                const result = response.data;
                if (result.data) {
                    $(`#${id}.master-status`)
                        .attr("class", `ck-pill-select master-status st-${memberStatus.toLowerCase()}`)
                        .blur();

                    const row = $(`#${id}`).closest("tr");
                    row.css("background", "#FFF0EE");
                    setTimeout(() => row.css("background", ""), 800);
                } else {
                    alert("Master update failed!");
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Master update failed!");
            });
    });
});