module.exports = {
  parserPreset: {
    parserOpts: {
      // regular expression e.g., "[SCRUM-7] changes description"
      headerPattern: /^\[([A-Z]+-\d+)\]\s+(.*)$/,
      headerCorrespondence: ["ticket", "subject"],
    },
  },
  plugins: [
    {
      rules: {
        "jira-ticket-format": (parsed) => {
          const { ticket, subject } = parsed;
          const isValid = Boolean(
            ticket && subject && subject.trim().length > 0,
          );

          return [
            isValid,
            "Invalid commit format! Required format: [PROJECT-TICKET] Subject (e.g., [SCRUM-7] Fix login)",
          ];
        },
      },
    },
  ],
  rules: {
    "jira-ticket-format": [2, "always"],
  },
};
