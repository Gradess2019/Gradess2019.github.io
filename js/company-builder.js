class CompanyBuilder {

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
        <p class="text-white-50 ps-4 pe-4 mb-0">
            ${this.buildPosition(json)}
            ${this.buildResponsibilities(json)}
            <p class="text-white-50 ps-4 pe-4">
            ${this.buildTerm(json)}
            </p>
        </p>
        <div class="m-auto w-75 mb-4 logo-container text-center">
            ${this.buildLogo(json)}
        </div>
`
    }

    buildTitle(json) {
        return json.title ? `<p class="h3 text-white-50 mt-3 ps-4 pe-4">${json.title}</p>` : ""
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
        <ul class="text-white-50 ps-5 mb-0">
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
        return json.logoUrl ? `<img src="${json.logoUrl}"/>` : ""
    }
}

export default CompanyBuilder;