import { useEffect, useState } from "react";

const useBDLocation = () => {
  /* ================= Location Data (shared) ================= */
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [unions, setUnions] = useState([]);

  /* ================= Present Address Selections ================= */
  const [presentDivision, setPresentDivision] = useState(null);
  const [presentDistrict, setPresentDistrict] = useState(null);
  const [presentUpazila, setPresentUpazila] = useState(null);
  const [presentUnion, setPresentUnion] = useState(null);

  /* ================= Permanent Address Selections ================= */
  const [permanentDivision, setPermanentDivision] = useState(null);
  const [permanentDistrict, setPermanentDistrict] = useState(null);
  const [permanentUpazila, setPermanentUpazila] = useState(null);
  const [permanentUnion, setPermanentUnion] = useState(null);

  /* ================= Helper to extract data ================= */
  const extractData = (json, tableName) => {
    const table = json.find(
      (item) => item.type === "table" && item.name === tableName
    );
    return table ? table.data : [];
  };

  /* ================= Load JSON Data ================= */
  useEffect(() => {
    fetch("/divisions.json")
      .then((res) => res.json())
      .then((json) => setDivisions(extractData(json, "divisions")));

    fetch("/districts.json")
      .then((res) => res.json())
      .then((json) => setDistricts(extractData(json, "districts")));

    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((json) => setUpazilas(extractData(json, "upazilas")));

    fetch("/unions.json")
      .then((res) => res.json())
      .then((json) => setUnions(extractData(json, "unions")));
  }, []);

  /* ================= Filtered Arrays (derived) ================= */
  const filteredPresentDistricts = districts.filter(
    (d) => String(d.division_id) === String(presentDivision?.id)
  );

  const filteredPresentUpazilas = upazilas.filter(
    (u) => String(u.district_id) === String(presentDistrict?.id)
  );

  const filteredPresentUnions = unions.filter(
    (u) => String(u.upazilla_id) === String(presentUpazila?.id)
  );

  const filteredPermanentDistricts = districts.filter(
    (d) => String(d.division_id) === String(permanentDivision?.id)
  );

  const filteredPermanentUpazilas = upazilas.filter(
    (u) => String(u.district_id) === String(permanentDistrict?.id)
  );

  const filteredPermanentUnions = unions.filter(
    (u) => String(u.upazilla_id) === String(permanentUpazila?.id)
  );

  /* ================= Reset dependent selections ================= */
  const selectPresentDivision = (division) => {
    setPresentDivision(division);
    setPresentDistrict(null);
    setPresentUpazila(null);
    setPresentUnion(null);
  };

  const selectPresentDistrict = (district) => {
    setPresentDistrict(district);
    setPresentUpazila(null);
    setPresentUnion(null);
  };

  const selectPresentUpazila = (upazila) => {
    setPresentUpazila(upazila);
    setPresentUnion(null);
  };

  const selectPresentUnion = (union) => setPresentUnion(union);

  const selectPermanentDivision = (division) => {
    setPermanentDivision(division);
    setPermanentDistrict(null);
    setPermanentUpazila(null);
    setPermanentUnion(null);
  };

  const selectPermanentDistrict = (district) => {
    setPermanentDistrict(district);
    setPermanentUpazila(null);
    setPermanentUnion(null);
  };

  const selectPermanentUpazila = (upazila) => {
    setPermanentUpazila(upazila);
    setPermanentUnion(null);
  };

  const selectPermanentUnion = (union) => setPermanentUnion(union);

  return {
    /* ================= Shared Location Data ================= */
    divisions,
    districts,
    upazilas,
    unions,

    /* ================= Present Address ================= */
    presentDivision,
    presentDistrict,
    presentUpazila,
    presentUnion,
    filteredPresentDistricts,
    filteredPresentUpazilas,
    filteredPresentUnions,
    setPresentDivision: selectPresentDivision,
    setPresentDistrict: selectPresentDistrict,
    setPresentUpazila: selectPresentUpazila,
    setPresentUnion: selectPresentUnion,

    /* ================= Permanent Address ================= */
    permanentDivision,
    permanentDistrict,
    permanentUpazila,
    permanentUnion,
    filteredPermanentDistricts,
    filteredPermanentUpazilas,
    filteredPermanentUnions,
    setPermanentDivision: selectPermanentDivision,
    setPermanentDistrict: selectPermanentDistrict,
    setPermanentUpazila: selectPermanentUpazila,
    setPermanentUnion: selectPermanentUnion,
  };
};

export default useBDLocation;
