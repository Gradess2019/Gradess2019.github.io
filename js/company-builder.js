let skeleton = `<div class="row w-100">
        <p class="h2 text-white-50">Screwdriver Entertainment</p>
        <p class="text-white-50 mb-0">
            <span class="fw-bold">Position</span>: Junior Unreal Engine Developer<br>
            <span class="fw-bold">Responsibilities</span>:</p>
            <ul class="text-white-50 ms-4 mb-0">
                <li>AI systems development</li>
                <li>Game mechanics development in Blueprint Visual Scripting</li>
                <li>UI development (UMG)</li>
            </ul>
        <p class="text-white-50">
            May 2017 — October 2018<br>
            1 year 5 months<br>
            <img src="images/Screwdriver_Entertainment.png"/>
        </p>
    </div>`


class CompanyBuilder {

    build(json) {
        return `
       <div class="row w-50 bg-dark rounded m-auto mb-5">
            ${this.buildTitle(json)}
            ${this.buildBody(json)}
        </div>
        `
    };

    buildBody(json) {
        return`
        <p class="text-white-50 ps-4 pe-4 m-0">
            ${this.buildPosition(json)}
            ${this.buildResponsibilities(json)}
            <p class="text-white-50 ps-4 pe-4">
            ${this.buildTerm(json)}
            </p>
        </p>
        <div class="m-auto w-75 mb-4">
            ${this.buildLogo(json)}
        </div>
`
    }

    buildTitle(json) {
        return json.title ? `<p class="h2 text-white-50 mt-3 ps-4 pe-4">${json.title}</p>` : ""
    }

    buildPosition(json) {
        return json.position ? `<span class="fw-bold">Position</span>: ${json.position}<br>` : ""
    }

    buildResponsibilities(json) {
        let responsibilities = json.responsibilities;

        let items = "";
        responsibilities.forEach(responsibility => {
            items += this.buildResponsibilityItem(responsibility);
        })

        let header = '<span class="fw-bold">Responsibilities</span>:</p>'
        let body = `
        <ul class="text-white-50 ms-5 mb-0">
            ${items}
        </ul>
`

        return header + body;
    }

    buildResponsibilityItem(item) {
        return `<li>${item}</li>`
    }

    buildTerm(json) {
        let term = json.term;
        let termStart = moment(term.start, "MMYYYY");

        let termEnd;
        let diff;
        if (term.end) {
            termEnd = moment(term.end, "MMYYYY");
            diff = moment.preciseDiff(termStart, termEnd);
        } else {
            termEnd = moment();
            diff = moment.preciseDiff(termStart, termEnd, true);
            diff = `${diff.years ? diff.years + " years ": ""}${diff.months} months`
        }

        return `${termStart.format("MMMM YYYY")} — ${term.end ? termEnd.format("MMMM YYYY") : "till now"}<br>${diff}<br>`
    }

    buildLogo(json) {
        return json.logoUrl ? `<img class="w-100" src="${json.logoUrl}"/>` : ""
    }
}

export default CompanyBuilder;