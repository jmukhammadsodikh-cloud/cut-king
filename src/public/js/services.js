console.log("CutKing services.js loaded");

$(function () {
    $(".service-status").on("change", function (e) {
        const id = e.target.id;
        const serviceStatus = $(`#${id}.service-status`).val();

        axios
            .post(`/admin/services/${id}`, { serviceStatus })
            .then((response) => {
                const result = response.data;
                if (result.data) {
                    $(`#${id}.service-status`)
                        .attr("class", `ck-pill-select service-status st-${serviceStatus.toLowerCase()}`)
                        .blur();

                    const row = $(`#${id}`).closest("tr");
                    row.css("background", "#FFF0EE");
                    setTimeout(() => row.css("background", ""), 800);
                } else {
                    alert("Service update failed!");
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Service update failed!");
            });
    });
});