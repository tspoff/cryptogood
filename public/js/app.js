function clearLoadingAnimation() {
    $(".cssload-container").hide();
}

function addNoExtensionAlert() {
    let div = document.createElement('div');
    div.innerHTML = `<div class="container mb-0"><div class="alert alert-danger" role="alert">
        Please install <a href="https://github.com/ChengOrangeJu/WebExtensionWallet" class="alert-link">WebExtensionWallet</a> to use Crypto Funding.
    </div></div>`;

    let nav = document.querySelector(".main-nav");
    nav.parentNode.insertBefore(div.firstChild, nav.nextSibling);
}

function addProjectCard(project) {
    let progress = parseFloat((convertWeiToNas(+project.collected) / convertWeiToNas(+project.goal) * 100).toFixed(2));
    if (progress == Infinity) {
        progress = 0;
    }

    let daysGoes = getDaysGoes(project.added);
    let hasOptional = project.image1 || project.image2 || project.image3 || project.additional || project.fullDescription;
    let innerHtml = `<div class="card project-card">
                        <img class="card-img-top project-logo" src="${project.preview || "img/no-image.png"}" alt="Card image cap">
                        <div class="card-body d-flex justify-content-between flex-column">
                            <div>
                                <h4 class="card-title">${project.title}</h4>
                                <div class="card-text project-description">
                                    <div>${project.shortDescription}</div>
                                </div>
                            </div>
                            <div>
                                <p class="card-text d-flex justify-content-between mt-2">
                                    <small class="text-success">${convertWeiToNas(+project.collected)} NAS Pledged</small>
                                </p>
                                <div class="progress" style="height: 10px;">
                                    <div class="progress-bar ${progress >= 100 ? "bg-success" : ""}" role="progressbar" style="width: ${progress}%;" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <p class="card-text d-flex justify-content-between mt-2">
                                    <small class="text-muted">${progress}%</small>
                                    <small class="text-muted">${daysGoes}</small>
                                </p>
                            </div>
                        </div>
                        <div class="modal-info" hidden>                
                            <div class="images">`;
    if (project.image1) {
        innerHtml += `<img src="${project.image1}">`;
    }
    if (project.image2) {
        innerHtml += `<img src="${project.image2}">`;
    }
    if (project.image3) {
        innerHtml += `<img src="${project.image3}">`;
    }
    innerHtml += `</div>`;

    if (project.title) {
        innerHtml += `<div class="project-title"><h3>${project.title}</h3></div>`;
    }
    if (project.fullDescription) {
        innerHtml += `<div class="full-description">${project.fullDescription}</div>`;
    }
    if (project.additional) {
        innerHtml += `<div class="additional">${project.additional}</div>`;
    }
    if (project.contributions) {
        console.log("contributions!", project.contributions);
        innerHtml += `<div class="contributions"><h5>Contributions</h5>`;
        for (var i = 0; i < project.contributions.length; i++) {
            innerHtml += `<p>${project.contributions[i].wallet}</p>`;
            innerHtml += `<p>${project.contributions[i].amount}</p>`;        
        }

        innerHtml += `</div>`
    }

    innerHtml += `</div>
                        <div class="card-footer d-flex justify-content-between align-items-center">
                            <div class="card-controls">
                                <button class="btn border rounded card-control like" data-toggle="tooltip" data-placement="bottom" title="Add to favorites"
                                data-project-id="${project.id}">
                                    <i class="fas fa-heart"></i>
                                </button>
                                <button class="btn border rounded card-control unlike" data-toggle="tooltip" data-placement="bottom" title="Remove from favorites"
                                data-project-id="${project.id}">
                                    <i class="fas fa-heartbeat"></i>
                                </button>
                                <button class="btn border rounded card-control support" data-toggle="tooltip" data-placement="bottom" title="Support the project"
                                data-project-id="${project.id}">
                                    <i class="fas fa-dollar-sign"></i>
                                </button>
                            </div>`;
    if (hasOptional) {
        innerHtml += `<button class="btn btn-light text-secondary" data-toggle="modal" data-target=".read-more-modal">Read more</button>`;
    }
    innerHtml += `</div></div>`;
    let div = document.createElement('div');
    div.innerHTML = innerHtml;
    let projectCard = div.firstChild;
    document.querySelector(".project-deck").append(projectCard);
    $(projectCard).find('.like').click(function () {
        let projectId = $(this).data("project-id");
        api.addToFavorites(projectId);
    });
    $(projectCard).find('.unlike').click(function () {
        let projectId = $(this).data("project-id");
        api.removeFromFavorites(projectId);
    });
    $(projectCard).find('.support').click(function () {
        let projectId = $(this).data("project-id");
        api.support(projectId);
    });

}

function getDaysGoes(unixStamp) {
    if (!unixStamp)
        return "";

    let date = new Date(+unixStamp);
    let today1 = new Date();
    let diffMs = (today1 - date);
    let diffDays = Math.floor(diffMs / 86400000); // days
    let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

    if (diffDays > 0) {
        return `Active for ${diffDays} days`;
    }

    if (diffHrs > 0) {
        return `Active for ${diffHrs} hours`;
    }

    return `Active for ${diffMins} minutes`;
}



