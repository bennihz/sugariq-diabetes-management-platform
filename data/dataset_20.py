"""
dataset_20.py
-------------
Generate 20 synthetic patient records for diabetes research/demos.

What you get:
- patient_id, name, age/DOB, sex
- anthropometrics (height/weight/BMI)
- vitals (BP, heart rate)
- labs (FPG/PPG/HbA1c + date, lipids)
- lifestyle (smoking, alcohol, activity, diet)
- family history, allergies
- medical_history (none, hypertension, stroke, heart failure,
  diabetic retinopathy, neuropathy, nephropathy,
  history of diabetic foot ulcer or amputation)
- ongoing_medications (none, Metformin, sitagliptin)

Important modeling notes:
- HbA1c baseline by diabetes type, then adjusted upward with higher BMI/weight,
  and with heavy alcohol use. For diabetics, we bias A1c to be ≥6.5 unless
  “well-controlled”. For non-diabetics, A1c is usually <6.5 (and mostly <5.7–6.4).
- Probabilities are normalized where used (fixes "probabilities do not sum to 1").

Run:
    python data\dataset_20.py
(or open the file and run in VS Code)

Output files:
    JSON and CSV will be written to your OneDrive path (edit OUTPUT_DIR if needed).
"""

import json
import os
from datetime import datetime, timedelta
import random

import numpy as np
import pandas as pd


# -----------------------------
# 0) CONFIG — EDIT THESE
# -----------------------------
# Your desired output location (use raw string for Windows paths)
OUTPUT_DIR = r"C:\Users\urmib\OneDrive\Desktop\Bayern Hackathlon\data"
JSON_NAME = "patient_dataset_20.json"
CSV_NAME = "patient_dataset_20.csv"

# Optional reference CSV (if present, we’ll use it to sample rough BMI/flags)
REF_CSV = os.path.join(os.path.dirname(__file__), "diabetes_012_health_indicators_BRFSS2015.csv")

# Number of patients to create
N_PATIENTS = 20

# Seed for reproducibility (change/remove if you want different samples each run)
np.random.seed(7)
random.seed(7)

TODAY = datetime.now()  # current date on your machine


# -----------------------------
# 1) HELPER FUNCTIONS
# -----------------------------
def _normalize_probs(probs, n_needed):
    """
    Ensures a valid probability vector:
    - If length mismatch: return uniform.
    - If sum <= 0: return uniform.
    - Else: normalize so it sums to 1.
    """
    probs = np.array(probs, dtype=float)
    if len(probs) != n_needed:
        return np.ones(n_needed) / n_needed
    s = probs.sum()
    if s <= 0:
        return np.ones(n_needed) / n_needed
    return probs / s


# ---- Diverse names (simple lists to simulate mix of regions) ----
FIRST_NAMES = {
    "European": ["Liam", "Noah", "Oliver", "Emma", "Mia", "Sophia", "Ava", "Lucas", "Amelia", "Hannah", "Jonas", "Luca", "Leon", "Marie", "Lea"],
    "South Asian": ["Aarav", "Vihaan", "Vivaan", "Reyansh", "Ishaan", "Ananya", "Diya", "Isha", "Aisha", "Riya"],
    "East Asian": ["Wei", "Li", "Yue", "Ming", "Hao", "Jia", "Mei", "Hana", "Yuki", "Sora"],
    "African": ["Kwame", "Kofi", "Amina", "Zainab", "Aisha", "Ade", "Femi", "Nia", "Thabo", "Lerato"],
    "Middle Eastern": ["Omar", "Yusuf", "Ali", "Hassan", "Fatima", "Layla", "Noor", "Mariam", "Zain", "Rami"],
    "Latinx": ["Santiago", "Mateo", "Diego", "Sofia", "Valentina", "Camila", "Lucia", "Carlos", "Juan", "Isabella"],
}
LAST_NAMES = {
    "European": ["Müller", "Schmidt", "Schneider", "Fischer", "Weber", "Wagner", "Becker", "Schulz", "Bauer", "Hoffmann", "Smith", "Brown", "Johnson", "Taylor"],
    "South Asian": ["Sharma", "Patel", "Reddy", "Iyer", "Khan", "Singh", "Gupta", "Das"],
    "East Asian": ["Chen", "Wang", "Zhang", "Liu", "Kim", "Park", "Yamamoto", "Tanaka"],
    "African": ["Mensah", "Okeke", "Diallo", "Abebe", "Mwangi", "Okafor", "Adebayo", "Hassan"],
    "Middle Eastern": ["Al-Masri", "Haddad", "Saleh", "Aziz", "Hussein", "Farah", "Khalil"],
    "Latinx": ["Garcia", "Martinez", "Lopez", "Hernandez", "Gonzalez", "Rodriguez", "Sanchez"],
}
REGION_KEYS = list(FIRST_NAMES.keys())
REGION_PROBS = _normalize_probs([0.33, 0.12, 0.12, 0.12, 0.11, 0.20], len(REGION_KEYS))


def gen_name():
    """Create a full name by picking a region, then a first+last name from that region."""
    region = np.random.choice(REGION_KEYS, p=REGION_PROBS)
    first = random.choice(FIRST_NAMES[region])
    last = random.choice(LAST_NAMES[region])
    return f"{first} {last}"


def sample_age_from_brfss(age_code):
    """
    BRFSS age bins (approx):
      1: 18-24, 2: 25-29, 3: 30-34, ... 12: 75-79, 13: 80-88
    We sample a uniform age within the bin.
    """
    mapping = {
        1: (18, 24),  2: (25, 29),  3: (30, 34),  4: (35, 39),
        5: (40, 44),  6: (45, 49),  7: (50, 54),  8: (55, 59),
        9: (60, 64), 10: (65, 69), 11: (70, 74), 12: (75, 79), 13: (80, 88),
    }
    lo, hi = mapping.get(int(age_code), (40, 70))
    return int(np.random.randint(lo, hi + 1))


def make_dob(age_years):
    """Create a realistic DOB given an age in years (spread birthdays through the year)."""
    dob = TODAY.replace(hour=0, minute=0, second=0, microsecond=0) - pd.DateOffset(years=int(age_years))
    dob = dob - pd.Timedelta(days=np.random.randint(0, 365))
    return dob.date()


def bmi_to_weight(bmi, height_cm):
    """BMI = kg / m^2  =>  kg = BMI * (m^2)."""
    return float(bmi) * (float(height_cm) / 100.0) ** 2


def gen_bp(high_bp_flag):
    """Generate systolic/diastolic BP; higher if 'high BP' flag is on."""
    if high_bp_flag == 1:
        sys = int(np.random.normal(142, 12))
        dia = int(np.random.normal(88, 8))
    else:
        sys = int(np.random.normal(124, 10))
        dia = int(np.random.normal(78, 7))
    return int(np.clip(sys, 95, 200)), int(np.clip(dia, 55, 120))


def gen_hr(diabetes_type):
    """Slightly higher resting HR in diabetes, with bounds."""
    base = np.random.normal(74, 6)
    if diabetes_type in ["T1", "T2"]:
        base += np.random.normal(2.5, 2.0)
    return int(np.clip(base, 50, 110))


def pick_height_cm(sex):
    """Simple sex-based height distributions."""
    if sex == "Female":
        return int(np.clip(np.random.normal(162, 7), 145, 185))
    else:
        return int(np.clip(np.random.normal(175, 8), 155, 200))


def pick_bmi_from_brfss(df_row):
    """
    If reference row has a BMI value, nudge around it.
    Else use a general distribution centered ~30.
    """
    if df_row is not None and "BMI" in df_row:
        base = float(df_row["BMI"])
        return float(np.clip(np.random.normal(base, 1.6), 17.0, 55.0))
    return float(np.clip(np.random.normal(29.5, 5.0), 17.0, 55.0))


def brfss_to_sex(sex_flag):
    """Map numeric sex flag to string; if ambiguous, default to Male for 1 and Female for 2."""
    if int(sex_flag) in [1, 2]:
        return "Male" if int(sex_flag) == 1 else "Female"
    return "Male" if int(sex_flag) == 1 else "Female"


def get_flag(row, colname, default_prob=0.5):
    """
    Try to read a 0/1 flag from the reference row.
    If not available, sample 1 with probability default_prob.
    """
    if row is not None and colname in row:
        try:
            return int(row[colname])
        except Exception:
            pass
    return 1 if np.random.rand() < default_prob else 0


def infer_sex_flag(row):
    """Guess a sex flag (1/2) from reference; otherwise sample ~48% male."""
    if row is not None:
        for cand in ["Sex", "sex", "male", "gender"]:
            if cand in row:
                try:
                    return int(row[cand])
                except Exception:
                    pass
    return 1 if np.random.rand() < 0.48 else 2


def infer_age_code(row):
    """
    If a usable age/age-category exists in the reference row, use it.
    Otherwise sample from bins 6..12 (skew older for diabetes realism).
    FIXED: probabilities are normalized so they always sum to 1.
    """
    if row is not None:
        for cand in ["Age", "age", "AgeCategory", "Age_Cat"]:
            if cand in row:
                try:
                    code = int(row[cand])
                    if code > 13:
                        # convert raw age to nearest bin
                        breaks = [24, 29, 34, 39, 44, 49, 54, 59, 64, 69, 74, 79]
                        for i, lim in enumerate(breaks, start=1):
                            if code <= lim:
                                return i
                        return 13
                    return code
                except Exception:
                    pass

    # fallback: bins 6..12 inclusive (7 bins). Slightly older skew.
    bins = list(range(6, 13))
    probs = _normalize_probs([0.06, 0.12, 0.16, 0.18, 0.18, 0.14, 0.16], len(bins))
    return int(np.random.choice(bins, p=probs))


# ---- Medical history & medications ----
MED_HISTORY_OPTIONS = [
    "hypertension", "stroke", "heart failure", "diabetic retinopathy",
    "neuropathy", "nephropathy", "history of diabetic foot ulcer or amputation",
]


def pick_med_history(diabetes_type, age):
    """
    Choose 0..many medical history items with probabilities that
    increase with diabetes and with age (for vascular outcomes).
    Returns "none" if nothing is chosen.
    """
    probs = {k: 0.05 for k in MED_HISTORY_OPTIONS}

    if diabetes_type in ["T1", "T2"]:
        probs.update({
            "hypertension": 0.45,
            "stroke": 0.06 + 0.004 * max(age - 50, 0),
            "heart failure": 0.07 + 0.004 * max(age - 55, 0),
            "diabetic retinopathy": 0.18 + (0.05 if diabetes_type == "T1" else 0.0),
            "neuropathy": 0.22 + (0.04 if diabetes_type == "T1" else 0.0),
            "nephropathy": 0.12,
            "history of diabetic foot ulcer or amputation": 0.05,
        })
    else:
        # Non-diabetics
        probs.update({
            "hypertension": 0.25 + 0.003 * max(age - 45, 0),
            "stroke": 0.02 + 0.002 * max(age - 60, 0),
            "heart failure": 0.02 + 0.003 * max(age - 65, 0),
            "diabetic retinopathy": 0.0,
            "neuropathy": 0.03,
            "nephropathy": 0.03,
            "history of diabetic foot ulcer or amputation": 0.0,
        })

    chosen = [cond for cond, p in probs.items() if np.random.rand() < np.clip(p, 0, 0.95)]
    return "none" if len(chosen) == 0 else "; ".join(sorted(set(chosen)))


def pick_medication(diabetes_type):
    """
    Allowed set: none | Metformin | sitagliptin
    - T2 tends to use Metformin most.
    - T1 and non-diabetics -> "none" (since insulin wasn’t an allowed option).
    """
    if diabetes_type == "T2":
        return str(np.random.choice(["none", "Metformin", "sitagliptin"], p=_normalize_probs([0.2, 0.65, 0.15], 3)))
    elif diabetes_type == "T1":
        return "none"
    else:
        return "none"


# ---- Lifestyle helpers ----
def pick_smoking(smoker_flag):
    return "current" if smoker_flag == 1 else str(np.random.choice(["never", "former"], p=_normalize_probs([0.7, 0.3], 2)))


def pick_alcohol(heavy_flag):
    return "heavy" if heavy_flag == 1 else str(np.random.choice(["none", "moderate"], p=_normalize_probs([0.35, 0.65], 2)))


def pick_activity(phys_activity_flag):
    return "low" if phys_activity_flag == 0 else str(np.random.choice(["moderate", "high"], p=_normalize_probs([0.7, 0.3], 2)))


def pick_diet_pattern():
    return str(np.random.choice(
        ["traditional", "high refined carbs", "Mediterranean-like", "vegetarian", "mixed/Western"],
        p=_normalize_probs([0.30, 0.22, 0.22, 0.10, 0.16], 5),
    ))


def pick_family_history(diabetes_type):
    return str(np.random.choice(["yes", "no"], p=_normalize_probs([0.62, 0.38], 2))) if diabetes_type in ["T1", "T2"] \
        else str(np.random.choice(["yes", "no"], p=_normalize_probs([0.25, 0.75], 2)))


def pick_allergies():
    return str(np.random.choice(["yes", "no"], p=_normalize_probs([0.18, 0.82], 2)))


# ---- Glucose & HbA1c with dependencies and category guidance ----
def gen_glucose_and_hba1c(diabetes_type, years_since_dx, bmi, weight_kg, alcohol_use):
    """
    Build FPG/PPG/HbA1c with realistic relationships:
    - Base by type
    - A1c increases with BMI and weight
    - Heavy alcohol pushes A1c up (esp. in diabetes)
    - Longer time since diagnosis can slightly lower A1c (treatment effect)
    - Then we nudge results toward the clinically expected categories:
        * Normal: <5.7
        * Prediabetes: 5.7–6.4
        * Diabetes: ≥6.5
    """
    if diabetes_type == "0":
        fpg_mu, ppg_mu, a1c_mu = 93, 118, 5.4
        fpg_sd, ppg_sd, a1c_sd = 8, 15, 0.25
    elif diabetes_type == "T1":
        fpg_mu, ppg_mu, a1c_mu = 138, 198, 7.6
        fpg_sd, ppg_sd, a1c_sd = 28, 35, 0.8
    else:  # T2
        fpg_mu, ppg_mu, a1c_mu = 132, 185, 7.2
        fpg_sd, ppg_sd, a1c_sd = 22, 30, 0.7

    fpg = np.random.normal(fpg_mu, fpg_sd)
    ppg = np.random.normal(ppg_mu, ppg_sd)
    a1c = np.random.normal(a1c_mu, a1c_sd)

    # BMI/weight effects (small but directional)
    a1c += 0.03 * max(bmi - 25, 0)               # ~+0.3 per +10 BMI over 25
    a1c += 0.01 * max((weight_kg - 85) / 5, 0)   # small weight effect
    fpg += 0.5 * max(bmi - 30, 0)
    ppg += 0.6 * max(bmi - 30, 0)

    # Treatment effect with time (some patients improve with care)
    if diabetes_type in ["T1", "T2"] and years_since_dx is not None:
        a1c -= np.clip(np.random.normal(0.02 * years_since_dx, 0.1), -0.5, 0.8)

    # Alcohol effect
    if alcohol_use == "heavy":
        if diabetes_type in ["T1", "T2"]:
            # Encourage A1c > 6 in diabetics with heavy alcohol use
            a1c = max(a1c, np.random.normal(6.4, 0.4))
            fpg += np.random.normal(4, 6)
            ppg += np.random.normal(6, 8)
        else:
            # Non-diabetic heavy drinkers: small bump but often <6
            a1c += np.random.normal(0.2, 0.15)
            a1c = min(a1c, np.random.normal(5.9, 0.15))

    # ---- Nudge toward clinical ranges you provided ----
    if diabetes_type == "0":
        # Mostly Normal/Prediabetes; rarely ≥6.5
        if a1c >= 6.5 and np.random.rand() < 0.8:
            a1c = np.random.uniform(5.5, 6.3)
    else:
        # For diabetics, ensure many are ≥6.5, but allow well-controlled cases
        if a1c < 6.5 and np.random.rand() < 0.7:
            a1c = np.random.uniform(6.5, 8.2)

    # Clamp and round
    fpg = float(np.clip(fpg, 65, 350))
    ppg = float(np.clip(ppg, 80, 450))
    a1c = float(np.clip(a1c, 4.5, 14.0))

    a1c_date = (TODAY - timedelta(days=int(np.random.randint(1, 181)))).date()
    return round(fpg, 1), round(ppg, 1), round(a1c, 2), str(a1c_date)


# -----------------------------
# 2) REFERENCE DATA (optional)
# -----------------------------
ref_df = None
if os.path.exists(REF_CSV):
    try:
        ref_df = pd.read_csv(REF_CSV)
    except Exception:
        ref_df = None

ref_subset = ref_df.copy() if ref_df is not None else None


# -----------------------------
# 3) PATIENT TYPE MIX
# -----------------------------
# ~10% T1, 75% T2, 15% non-diabetic "0"
types = (["T1"] * int(round(0.10 * N_PATIENTS)) +
         ["T2"] * int(round(0.75 * N_PATIENTS)) +
         ["0"]  * (N_PATIENTS - int(round(0.10 * N_PATIENTS)) - int(round(0.75 * N_PATIENTS))))
random.shuffle(types)


# -----------------------------
# 4) GENERATE PATIENTS
# -----------------------------
patients = []

for i in range(N_PATIENTS):
    # Pull a reference row if available (for BMI/flags)
    row = ref_subset.sample(1).iloc[0] if (ref_subset is not None and len(ref_subset) > 0) else None

    # Sex & age
    sex_flag = infer_sex_flag(row)
    sex = brfss_to_sex(sex_flag)
    age_code = infer_age_code(row)
    age = sample_age_from_brfss(age_code)
    dob = make_dob(age)

    # Risk flags (if ref is missing, use defaults)
    high_bp_flag   = get_flag(row, "HighBP",            0.55)
    high_chol_flag = get_flag(row, "HighChol",          0.45)
    smoker_flag    = get_flag(row, "Smoker",            0.18)
    heavy_alc_flag = get_flag(row, "HvyAlcoholConsump", 0.06)
    phys_act_flag  = get_flag(row, "PhysActivity",      0.55)

    height_cm = pick_height_cm(sex)
    bmi = pick_bmi_from_brfss(row)
    weight_kg = round(float(np.clip(bmi_to_weight(bmi, height_cm), 40, 250)), 1)

    sys_bp, dia_bp = gen_bp(high_bp_flag)
    hr = gen_hr(types[i])

    # Years since diagnosis (0 for non-diabetic, right-skew for diabetics)
    yrs_since_dx = 0 if types[i] == "0" else int(np.clip(np.random.exponential(scale=6.0), 0, 35))

    # Lifestyle
    smoking = pick_smoking(smoker_flag)
    alcohol = pick_alcohol(heavy_alc_flag)
    activity = pick_activity(phys_act_flag)
    diet = pick_diet_pattern()
    fam_hist = pick_family_history(types[i])
    allergies = pick_allergies()

    # Labs
    fpg, ppg, hba1c, hba1c_date = gen_glucose_and_hba1c(types[i], yrs_since_dx, bmi, weight_kg, alcohol)

    # Lipids (simple model; bumped if high cholesterol and if diabetes)
    base_tc = np.random.normal(195, 28) + (20 if high_chol_flag == 1 else 0)
    base_ldl = np.random.normal(115, 24) + (18 if high_chol_flag == 1 else 0)
    base_hdl = np.random.normal(49, 11) - (2 if high_chol_flag == 1 else 0)
    base_tg  = np.random.normal(145, 50) + (25 if high_chol_flag == 1 else 0)
    if types[i] in ["T1", "T2"]:
        base_hdl += np.random.normal(-1, 2)
        base_tg  += np.random.normal(15, 10)
    tc  = int(np.clip(round(base_tc), 110, 320))
    ldl = int(np.clip(round(base_ldl),  50, 220))
    hdl = int(np.clip(round(base_hdl),  25, 100))
    tg  = int(np.clip(round(base_tg),   45, 600))

    med_history = pick_med_history(types[i], age)
    medication  = pick_medication(types[i])

    patients.append({
        "patient_id": f"P{2000 + i}",
        "name": gen_name(),
        "dob": str(dob),
        "age": int(age),
        "sex": sex,
        "diabetes_type": types[i],                 # "0", "T1", or "T2"
        "years_since_diagnosis": int(yrs_since_dx),
        "height_cm": int(height_cm),
        "weight_kg": float(weight_kg),
        "BMI": round(float(bmi), 1),
        "systolic_bp": int(sys_bp),
        "diastolic_bp": int(dia_bp),
        "heart_rate_bpm": int(hr),
        "fasting_glucose_mg_dL": float(fpg),
        "postprandial_glucose_mg_dL": float(ppg),
        "hba1c_percent": float(hba1c),
        "hba1c_date": hba1c_date,
        "total_cholesterol_mg_dL": int(tc),
        "ldl_cholesterol_mg_dL": int(ldl),
        "hdl_cholesterol_mg_dL": int(hdl),
        "triglycerides_mg_dL": int(tg),
        "smoking_status": smoking,
        "alcohol_use": alcohol,
        "physical_activity_level": activity,
        "diet_pattern": diet,
        "family_history": fam_hist,
        "allergies": allergies,
        "medical_history": med_history,
        "ongoing_medications": medication,
    })


# -----------------------------
# 5) SAVE FILES
# -----------------------------
os.makedirs(OUTPUT_DIR, exist_ok=True)
json_path = os.path.join(OUTPUT_DIR, JSON_NAME)
csv_path  = os.path.join(OUTPUT_DIR, CSV_NAME)

with open(json_path, "w", encoding="utf-8") as f:
    json.dump(patients, f, indent=2, ensure_ascii=False)

df = pd.DataFrame(patients)
df.to_csv(csv_path, index=False, encoding="utf-8")

print("Files saved successfully!")
print(f"JSON: {json_path}")
print(f"CSV : {csv_path}")

# Small sanity summary
df["a1c_group"] = pd.cut(
    df["hba1c_percent"],
    bins=[-np.inf, 5.7, 6.4, np.inf],
    labels=["Normal (<5.7)", "Prediabetes (5.7–6.4)", "Diabetes (≥6.5)"]
)
print("\nCounts by diabetes_type:")
print(df["diabetes_type"].value_counts())
print("\nCounts by HbA1c group:")
print(df["a1c_group"].value_counts())
