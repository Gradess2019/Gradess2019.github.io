class ProjectBuilder {

    build(json) {
        return `
        <div class="row">
            ${this.buildTitle(json)}
            ${this.buildBody(json)}
        </div>
        `
    };

    buildBody(json) {
        return`
        <p class=\"text-white-50\">
            ${this.buildCompany(json)}<br>
            ${this.buildPosition(json)}<br>
            ${this.buildTechnologies(json)}<br>
            ${this.buildPlatform(json)}<br>
            ${this.buildDescription(json)}<br>
            ${this.buildVideo(json)}<br>
        </p>
`
    }

    buildTitle(json) {
        return json.title ? `<p class="h2 text-white-50">${json.title}</p>` : ""
    }

    buildCompany(json) {
        return json.companyName ? `<span class="fw-bold">Company</span>: ${json.companyName}` : ""
    }

    buildPosition(json) {
        return json.position ? `<span class="fw-bold">Position</span>: ${json.position}` : ""
    }

    buildTechnologies(json) {
        return json.technologies ? `<span class="fw-bold">Technologies</span>: ${json.technologies}` : ""
    }

    buildPlatform(json) {
        return json.platform ? `<span class="fw-bold">Platform</span>: ${json.platform}` : ""
    }

    buildDescription(json) {
        return json.description ? `<span class="fw-bold">Brief description</span>: ${json.description}` : ""
    }

    buildVideo(json) {
        return json.videoUrl ? `<iframe src="${json.videoUrl}"></iframe>` : ""
    }
}

export default ProjectBuilder;