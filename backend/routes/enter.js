router.get("/enter", async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    // Fetch the token from the database
    const { data: entry, error } = await supabase
      .from("entry_tokens")
      .select("*")
      .eq("token", token)
      .single();

    if (error || !entry) {
      return res.status(400).json({ error: "Invalid token" });
    }

    if (entry.used) {
      return res.status(400).json({ error: "Token has already been used" });
    }

    // Call the stored procedure to safely update the token status
    const { data: updatedEntry, error: updateError } = await supabase
      .from("entry_tokens")
      .update({ used: true })
      .eq("token", token)
      .eq("used", false)
      .select(); // This confirms the update

    if (updateError || updatedEntry.length === 0) {
      return res.status(400).json({ error: "Invalid token" });
    }

    res.json({ message: "Entry successful!" });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
