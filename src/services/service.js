import fs from "fs";
import { promisify } from "util";

const localStoreFile = "./local-store-file.json";
const beep = process.stdout.write("\x07");
const writeStore = promisify(fs.writeFile);
const readStore = promisify(fs.readFile);

export const createReport = async (report) => {
  let reportsArr = [];
  const storeData = await readStore(localStoreFile, "utf-8");

  if (storeData) {
    const storeArr = JSON.parse(storeData);
    report.report_template_id =
      storeArr[storeArr.length - 1].report_template_id + 1;
    storeArr.push(report);
    reportsArr = storeArr;
  } else {
    report.report_template_id = 1;
    reportsArr = [report];
  }
  await writeStore(localStoreFile, JSON.stringify(reportsArr));

  return { report_template_id: report.report_template_id };
};

export const updateReport = async (report) => {
  if (!report.report_template_id) {
    throw new Error(`Required report id`);
  }
  const storeData = await readStore(localStoreFile, "utf-8");
  if (storeData) {
    const storeArr = JSON.parse(storeData);
    const index = storeArr.findIndex(
      (x) => x.report_template_id === +report.report_template_id
    );

    if (storeArr[index]) {
      storeArr[index].name = report.name;
      storeArr[index].description = report.description;
      storeArr[index].email = report.email;
      storeArr[index].report_format = report.report_format;
      storeArr[index].from_date = report.from_date;
      storeArr[index].to_date = report.to_date;
      storeArr[index].timeZoneId = report.timeZoneId;
      storeArr[index].user_id = report.user_id;
      storeArr[index].visibility = report.visibility;
      await writeStore(localStoreFile, JSON.stringify(storeArr));
      return storeArr[index];
    } else {
      throw new Error(`Report not found with id = ${reportId}`);
    }
  } else {
    throw new Error(`Nothing in store`);
  }
};

export const getReport = async (reportId) => {
  const storeData = await readStore(localStoreFile, "utf-8");
  if (storeData) {
    const storeArr = JSON.parse(storeData);
    const report = storeArr.find((x) => x.report_template_id === +reportId);
    if (report) {
      return report;
    } else {
      throw new Error(`Report not found with id = ${reportId}`);
    }
  } else {
    throw new Error(`Nothing in store`);
  }
};

export const deleteReport = async (reportId) => {
  const storeData = await readStore(localStoreFile, "utf-8");
  if (storeData) {
    const storeArr = JSON.parse(storeData);
    const index = storeArr.findIndex((x) => x.report_template_id === +reportId);
    if (index > -1) {
      storeArr.splice(index, 1);
      await writeStore(localStoreFile, JSON.stringify(storeArr));
      return `Report Deleted with id ${reportId}`;
    } else {
      throw new Error(`Report not found with id = ${reportId}`);
    }
  } else {
    throw new Error(`Nothing in store`);
  }
};
