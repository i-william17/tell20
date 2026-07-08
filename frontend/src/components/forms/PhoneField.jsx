import { PhoneInput } from "react-international-phone";

export default function PhoneField({ label = "Phone", onChange, required = false, value }) {
  return (
    <label className="grid gap-2">
      <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
        {label}
        {required ? " *" : ""}
      </span>
      <PhoneInput
        defaultCountry="ke"
        preferredCountries={["ke", "ug", "tz", "rw", "us", "gb"]}
        value={value}
        onChange={onChange}
        required={required}
        inputProps={{
          name: "phone",
          autoComplete: "tel",
          required
        }}
        className="tell20-phone"
        inputClassName="tell20-phone-input"
        countrySelectorStyleProps={{
          buttonClassName: "tell20-phone-country"
        }}
      />
    </label>
  );
}
