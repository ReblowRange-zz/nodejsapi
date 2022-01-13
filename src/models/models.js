export class Report {
  constructor(
    report_template_id,
    name,
    description,
    email,
    report_format,
    from_date,
    to_date,
    timeZoneId,
    user_id,
    visibility
  ) {
    this.report_template_id = report_template_id;
    this.name = name;
    this.description = description;
    this.email = email;
    this.report_format = report_format;
    this.from_date = from_date;
    this.to_date = to_date;
    this.timeZoneId = timeZoneId;
    this.user_id = user_id;
    this.visibility = visibility;
  }

  static fromJson(body) {
    const report = new Report(
      body.report_template_id,
      body.name,
      body.description,
      body.email,
      body.report_format,
      body.from_date,
      body.to_date,
      body.timeZoneId,
      body.user_id,
      body.visibility
    );
    return report;
  }
}
