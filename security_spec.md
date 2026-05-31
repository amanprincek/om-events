# Security Policy & Hardened Relational Invariants

This specification provides the zero-trust data protection blueprint for **Om Tent House Operations**.

## 1. Relational Data Invariants
1. **Sovereign Contract Isolation**: Booking contracts can only be created by signed-in verified users.
2. **Relational Sync Constraint**: No Event, Return, or Dispatch document can be created without verifying that its parent Booking exists.
3. **No Shadow Updates (Ghost Fields)**: Clients are unable to inject undocumented fields (e.g., `isVerifiedAdmin`) during updates due to strict key size and Map-Diff checking.
4. **Temporal Lock**: Non-editable audit trails like `createdAt` and `reportedAt` are immutable and verified against the server timestamp (`request.time`).
5. **No Identity Spoofing**: Signed-in writers are constrained to write their own authenticated `userId` or match active corporate profiles.

---

## 2. The "Dirty Dozen" Privilege Escalation Payloads

These 12 scenarios represent security risks that must be blocked by the Firestore rules.

| # | Targeted Collection | Attack Vector | Payload Description |
|---|---------------------|---------------|---------------------|
| 1 | `staff` | Identity Spoofing / Self-Elevated Privilege | Authenticated Staff Member `usr_3` attempts to set their role to `OWNER` |
| 2 | `inventory` | Resource Poisoning / Inflation attack | Anonymous user attempts to update total inventory count to `999999` |
| 3 | `bookings` | Terminal State Shortcutting | Viewer attempts to directly change booking status from `DRAFT` to `COMPLETED` |
| 4 | `returns` | Orphaned Writes / Parent Bypass | Malicious writer attempts to create an unassociated return record with a bogus ID |
| 5 | `maintenance_reports`| Privilege Escalation | VIEWER attempts to write technician assignment credentials |
| 6 | `customers` | PII Harvesting / Unauthorized scraping | VIEWER attempts to perform a blanket read of all customer addresses and phones |
| 7 | `bookings` | Price tampering / Invoicing bypass | STAFF member attempts to set total Amount to `0` for an active transaction |
| 8 | `inventory_categories`| Write pollution | VIEWER role attempts to declare a new category |
| 9 | `staff` | Unverified email escalation | User with unverified email attempts to update active employee databases |
| 10| `gallery_media` | Arbitrary media URL poison | Malicious caller attempts to insert a 1MB payload string as a media imageUrl |
| 11| `dispatches` | Event dispatch spoofing | Malicious signed-in user attempts to mark dispatch Status of another group as `DELIVERED` |
| 12| `inquiries` | Post-resolution compromise | Anonymous writer attempts to overwrite a finalized resolved inquiry record |

---

## 3. Test Runner Blueprint (`firestore.rules.test.ts`)

This is the architectural test execution file to assert compile and rejection constraints.

```typescript
import { assertFails, assertSucceeds, initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

describe("Om Tent House Rules Fortress - Hardred Red Team Tests", () => {
  let testEnv: any;

  before(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: "yttriferous-isotope-vlsxp",
      firestore: {
        rules: require("fs").readFileSync("firestore.rules", "utf8")
      }
    });
  });

  after(async () => {
    await testEnv.cleanup();
  });

  it("should block self-elevating staff role modifications [ATTACK 1]", async () => {
    const maliciousStaff = testEnv.authenticatedContext("usr_staff_1", { email_verified: true });
    const db = maliciousStaff.firestore();
    
    await assertFails(
      setDoc(doc(db, "staff/usr_staff_1"), {
        role: "OWNER",
        name: "Malcontent Staff member"
      })
    );
  });

  it("should block unauthenticated inventory increases [ATTACK 2]", async () => {
    const unauth = testEnv.unauthenticatedContext();
    const db = unauth.firestore();
    
    await assertFails(
      setDoc(doc(db, "inventory/tent_1"), {
        totalOwned: 999999
      })
    );
  });

  it("should block non-owners from scraping customer contact directories [ATTACK 6]", async () => {
    const viewer = testEnv.authenticatedContext("usr_viewer_1", { email_verified: true });
    const db = viewer.firestore();
    
    await assertFails(
      getDoc(doc(db, "customers/cust_gala_1"))
    );
  });
});
```
