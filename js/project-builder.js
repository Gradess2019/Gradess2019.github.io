class ProjectBuilder {

    build(json) {
        return `
        <div class="row w-50 bg-idea rounded m-auto mb-5 border border-2 invisible">
            ${this.buildTitle(json)}
            ${this.buildBody(json)}
        </div>
        `
    };

    buildBody(json) {
        return`
        <p class="text-white-50 ps-4 pe-4">
            ${this.buildCompany(json)}
            ${this.buildPosition(json)}
            ${this.buildTechnologies(json)}
            ${this.buildPlatform(json)}
            ${this.buildDescription(json)}
            ${this.buildLinks(json)}
        </p>
        ${this.buildVideo(json)}
`
    }

    buildTitle(json) {
        return json.title ? `<p class="h2 text-white-50 mt-3 ps-4 pe-4">${json.title}</p>` : ""
    }

    buildCompany(json) {
        return json.companyName ? `<span class="fw-bold">Company</span>: ${json.companyName}<br>` : ""
    }

    buildPosition(json) {
        return json.position ? `<span class="fw-bold">Position</span>: ${json.position}<br>` : ""
    }

    buildTechnologies(json) {
        return json.technologies ? `<span class="fw-bold">Technologies</span>: ${json.technologies}<br>` : ""
    }

    buildPlatform(json) {
        return json.platform ? `<span class="fw-bold">Platform</span>: ${json.platform}<br>` : ""
    }

    buildDescription(json) {
        return json.description ? `<span class="fw-bold">Brief description</span>: ${json.description}<br>` : ""
    }

    buildLinks(json) {
        if (!json.links) return "";

        let builtLinks = ""
        let separator = json.links.length > 1 ? "<br>" : ""
        json.links.forEach(link => {
            let builtLink = `<a class="link-warning text-decoration-none" target="_blank" rel="noopener noreferrer" href="${link.url}">${link.name}</a>${separator}`
            builtLinks += builtLink;
        });
        return builtLinks;
    }

    buildVideo(json) {
        return json.videoUrl ? `
            <div class="video-container m-auto mb-5">
            <iframe width="640" height="480" allow="fullscreen;" src="${json.videoUrl}"></iframe>
            </div>` : ""
    }
}

export default ProjectBuilder;