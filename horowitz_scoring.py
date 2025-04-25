def calculate_horowitz_score(section1, section3, section4_physical_days, section4_mental_days):
    # Section 1 total
    section1_total = sum(section1.values())

    # Section 2 bonus points (if rated 3 on specific symptoms, add 5 each)
    bonus_symptoms = [3, 33, 18, 24, 37]  # IDs from Section 1
    section2_total = sum(5 for sid in bonus_symptoms if section1.get(sid, 0) == 3)

    # Section 3 total
    section3_total = sum(section3.values())

    # Section 4 scoring based on days
    def score_days(days):
        if 0 <= days <= 5:
            return 1
        elif 6 <= days <= 12:
            return 2
        elif 13 <= days <= 20:
            return 3
        elif 21 <= days <= 30:
            return 4
        else:
            return 0

    section4_total = score_days(section4_physical_days) + score_days(section4_mental_days)

    # Final score
    final_score = section1_total + section2_total + section3_total + section4_total

    # Interpretation
    if final_score >= 46:
        interpretation = "High probability of a tick-borne disorder. Seek medical evaluation."
    elif 21 <= final_score <= 45:
        interpretation = "Possible tick-borne disorder. Seek medical evaluation."
    else:
        interpretation = "Not likely to have a tick-borne disorder."

    return {
        "section1_total": section1_total,
        "section2_total": section2_total,
        "section3_total": section3_total,
        "section4_total": section4_total,
        "final_score": final_score,
        "interpretation": interpretation
    }

# Example usage:
section1_input = {
    3: 3,    # Fatigue
    18: 2,   # Joint pain
    24: 3,   # Tingling
    33: 3,   # Forgetfulness
    37: 1    # Sleep issues
    # add more if needed...
}

section3_input = {
    44: 3,
    46: 2,
    48: 4
    # add more if needed...
}

result = calculate_horowitz_score(section1_input, section3_input, 10, 5)
print(result)
