module.exports = {
  // Allow tactics separated by ; or newline or both
  // Using a more permissive separator
  tactics: $ => prec.left(
    seq('by', sep1_($._tactic, choice(';', $._newline, seq(';', $._newline)))),
  ),

  apply_tactic: $ => seq('apply', $._expression),
  rewrite: $ => seq(choice('rewrite', 'rw'), $._expression),
  term: $ => seq('exact', $._expression),
  simp: $ => prec.right(seq(
    choice('simp', 'simp_all'),
    optional(field('config', seq('[', sep1($._expression, ','), ']'))),
  )),
  trivial: $ => 'trivial',

  // src/Init/Tactics.lean
  intro: $ => prec.left(seq(choice('intro', 'intros'), repeat($._expression))),
  rfl: $ => choice('rfl', 'rfl\''),

  // Common simple tactics (no arguments that conflict)
  ring_tactic: $ => choice('ring', 'ring_nf'),
  omega_tactic: $ => 'omega',
  tauto_tactic: $ => 'tauto',
  decide_tactic: $ => choice('decide', 'native_decide'),
  constructor_tactic: $ => 'constructor',
  assumption_tactic: $ => 'assumption',
  contradiction_tactic: $ => 'contradiction',
  contrapose_tactic: $ => choice('contrapose', 'contrapose!'),

  // Tactics with arguments handled by _user_tactic fallback (includes sorry)
  _user_tactic: $ => $._expression,

  _tactic: $ => choice(
    $.apply_tactic,
    $.rewrite,
    $.simp,
    $.term,
    $.trivial,

    $.intro,
    $.rfl,

    // Simple tactics
    $.ring_tactic,
    $.omega_tactic,
    $.tauto_tactic,
    $.decide_tactic,
    $.constructor_tactic,
    $.assumption_tactic,
    $.contradiction_tactic,
    $.contrapose_tactic,

    $._user_tactic,
  ),
}
