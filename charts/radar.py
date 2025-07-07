import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

# Vehicle feature categories to compare
features = [
    "Range",
    "Charging Info",
    "Comfort Features",
    "Infotainment/Connectivity",
    "Safety Tech",
    "Driving Assistance",
    "Interior Space",
    "Customisation Options"
]

# Ratings for how well each vehicle page surfaces these features (scale 1–5)
ratings = {
    "Volkswagen ID.3": [4, 3, 3, 3, 4, 4, 3, 2],
    "Renault 5": [4, 4, 3, 4, 4, 3, 3, 5],
    "Kia EV3": [5, 5, 4, 5, 5, 5, 4, 4],
    "Mini Electric": [4, 4, 4, 5, 4, 3, 3, 4],
    "BYD Dolphin": [4, 4, 3, 3, 4, 3, 3, 2],
    "MG4 EV": [5, 4, 3, 3, 4, 3, 4, 2]
}

# Create DataFrame
df = pd.DataFrame(ratings, index=features)

# Setup radar chart
labels = np.array(features)
num_vars = len(labels)

# Compute angle for each axis
angles = np.linspace(0, 2 * np.pi, num_vars, endpoint=False).tolist()
angles += angles[:1]

# Initialise plot
fig, ax = plt.subplots(figsize=(10, 8), subplot_kw=dict(polar=True))

# Plot each car model
for model, values in df.items():
    stats = values.tolist()
    stats += stats[:1]  # Complete the loop
    ax.plot(angles, stats, label=model)
    ax.fill(angles, stats, alpha=0.1)

# Configure chart
ax.set_theta_offset(np.pi / 2)
ax.set_theta_direction(-1)
ax.set_thetagrids(np.degrees(angles[:-1]), labels)
ax.set_ylim(0, 5)
ax.set_title("Visibility of Key Vehicle Features on Brand Pages (1–5)", size=14)
ax.legend(loc='upper right', bbox_to_anchor=(1.3, 1.1))

plt.tight_layout()
plt.show()
