import React from "react";
import TestRenderer from "react-test-renderer";
import AgencyProfileForm from "../src/components/AgencyProfileForm/AgencyProfileForm";

describe("AgencyProfileForm.handleInputChange", () => {
  it("updates state for existing keys", () => {
    // calls handleInputChange() with various (known) keys and test values to
    // check that it updates AgencyProfileForm's state correctly
    const component = TestRenderer.create(<AgencyProfileForm.WrappedComponent agencyData={null} />)
      .root.instance;

    // string value
    expect(component.state.mainSiteAddress).toBe("");
    component.handleInputChange("mainSiteAddress", "123 abc");
    expect(component.state.mainSiteAddress).toBe("123 abc");

    // embedded object string value
    expect(component.state.tableContent.name).toBe("");
    component.handleInputChange("tableContent.name", "Test Name");
    expect(component.state.tableContent.name).toBe("Test Name");

    // string array value
    expect(component.state.additionalAddresses).toEqual([""]);
    component.handleInputChange("additionalAddresses", ["address1"]);
    expect(component.state.additionalAddresses).toEqual(["address1"]);

    // object array value
    expect(component.state.contacts).toEqual([
      {
        contact: "",
        position: "",
        phoneNumber: "",
        email: "",
      },
    ]);
    component.handleInputChange("contacts", [
      {
        contact: "A",
        position: "S",
        phoneNumber: "D",
        email: "F",
      },
    ]);
    expect(component.state.contacts).toEqual([
      {
        contact: "A",
        position: "S",
        phoneNumber: "D",
        email: "F",
      },
    ]);

    // boolean value
    expect(component.state.distributionDays.monday).toBe(false);
    component.handleInputChange("distributionDays.monday", true);
    expect(component.state.distributionDays.monday).toBe(true);

    // number value
    expect(component.state.tableContent.standAloneFreezer).toBe(0);
    component.handleInputChange("tableContent.standAloneFreezer", 3);
    expect(component.state.tableContent.standAloneFreezer).toBe(3);

    // same boolean value again
    expect(component.state.distributionDays.monday).toBe(true);
    component.handleInputChange("distributionDays.monday", false);
    expect(component.state.distributionDays.monday).toBe(false);

    // same string value again
    expect(component.state.mainSiteAddress).toBe("123 abc");
    component.handleInputChange("mainSiteAddress", "456 def");
    expect(component.state.mainSiteAddress).toBe("456 def");
  });

  it("doesn't update state for unknown keys", () => {
    // calls handleInputChange() with an unknown key to check that it rejects
    // the change and doesn't add it to the state
    const component = TestRenderer.create(<AgencyProfileForm.WrappedComponent agencyData={null} />)
      .root.instance;

    expect(component.state.keyThatShouldNotBeUsed).toBeUndefined();
    component.handleInputChange("keyThatShouldNotBeUsed", "abcd");
    expect(component.state.keyThatShouldNotBeUsed).toBeUndefined();

    expect(component.state.tableContent.unknownKey).toBeUndefined();
    component.handleInputChange("tableContent.unknownKey", "abcd");
    expect(component.state.tableContent.unknownKey).toBeUndefined();
  });
});

describe("AgencyProfileForm.isValid", () => {
  it("returns true for valid fields", () => {
    // checks that isValid() correctly identifies valid fields (which are not in the errors list)
    const component = TestRenderer.create(<AgencyProfileForm.WrappedComponent agencyData={null} />)
      .root.instance;
    component.setState({ errors: ["field1", "field3", "field5"] });

    expect(component.isValid("field2")).toBe(true);
    expect(component.isValid("field4")).toBe(true);
  });

  it("returns false for invalid fields", () => {
    // checks that isValid() correctly identifies invalid fields (which are present in the errors
    // list)
    const component = TestRenderer.create(<AgencyProfileForm.WrappedComponent agencyData={null} />)
      .root.instance;
    component.setState({ errors: ["field1", "field3", "field5"] });

    expect(component.isValid("field1")).toBe(false);
    expect(component.isValid("field5")).toBe(false);
  });

  it("returns true before validation has occurred", () => {
    // checks that isValid() treats all fields as valid when there is no errors list yet
    const component = TestRenderer.create(<AgencyProfileForm.WrappedComponent agencyData={null} />)
      .root.instance;

    expect(component.isValid("field1")).toBe(true);
    expect(component.isValid("field2")).toBe(true);
  });
});

describe("AgencyProfileForm.addAddress", () => {
  it("adds an empty string to the array of additional addresses", () => {
    // checks that addAddress() does append an empty string to the string array
    // holding additional addresses in the state
    const component = TestRenderer.create(<AgencyProfileForm.WrappedComponent agencyData={null} />)
      .root.instance;

    component.handleInputChange("additionalAddresses", ["address1"]);
    // the toEqual() assertion does a recursive check for "deep" equality
    expect(component.state.additionalAddresses).toEqual(["address1"]);
    component.addAddress();
    expect(component.state.additionalAddresses).toEqual(["address1", ""]);
    component.addAddress();
    expect(component.state.additionalAddresses).toEqual(["address1", "", ""]);
  });
});

describe("AgencyProfileForm.removeAddress", () => {
  it("removes the last string in the array of additional addresses", () => {
    // checks that removeAddress() does remove the last element from the string array
    // holding additional addresses in the state
    const component = TestRenderer.create(<AgencyProfileForm.WrappedComponent agencyData={null} />)
      .root.instance;

    component.handleInputChange("additionalAddresses", ["address1", "address2", "address3"]);
    // the toEqual() assertion does a recursive check for "deep" equality
    expect(component.state.additionalAddresses).toEqual(["address1", "address2", "address3"]);
    component.removeAddress();
    expect(component.state.additionalAddresses).toEqual(["address1", "address2"]);
    component.removeAddress();
    expect(component.state.additionalAddresses).toEqual(["address1"]);
  });
});

describe("AgencyProfileForm.addContact", () => {
  it("adds a new contact object to the array of contacts", () => {
    // checks that addContact() does append a "blank" contact object (with
    // correct keys, mapped to empty strings) to the array holding contact info
    // in the state
    const component = TestRenderer.create(<AgencyProfileForm.WrappedComponent agencyData={null} />)
      .root.instance;
    const blankContact = {
      contact: "",
      position: "",
      phoneNumber: "",
      email: "",
    };
    const testContact = {
      contact: "A",
      position: "S",
      phoneNumber: "D",
      email: "F",
    };

    component.handleInputChange("contacts", [testContact]);
    // the toEqual() assertion does a recursive check for "deep" equality
    expect(component.state.contacts).toEqual([testContact]);
    component.addContact();
    expect(component.state.contacts).toEqual([testContact, blankContact]);
    component.addContact();
    expect(component.state.contacts).toEqual([testContact, blankContact, blankContact]);
  });
});

describe("AgencyProfileForm.removeContact", () => {
  it("removes the last contact object in the array of contacts", () => {
    // checks that removeContact() does remove the last element in the array holding contact info
    // in the state
    const component = TestRenderer.create(<AgencyProfileForm.WrappedComponent agencyData={null} />)
      .root.instance;
    const contact1 = { contact: "A", position: "S", phoneNumber: "D", email: "F" };
    const contact2 = { contact: "Q", position: "W", phoneNumber: "E", email: "R" };
    const contact3 = { contact: "T", position: "Y", phoneNumber: "U", email: "I" };

    component.handleInputChange("contacts", [contact1, contact2, contact3]);
    // the toEqual() assertion does a recursive check for "deep" equality
    expect(component.state.contacts).toEqual([contact1, contact2, contact3]);
    component.removeContact();
    expect(component.state.contacts).toEqual([contact1, contact2]);
    component.removeContact();
    expect(component.state.contacts).toEqual([contact1]);
  });
});
