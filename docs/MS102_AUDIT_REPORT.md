# MS-102 Questions Audit Report

Generated: 2026-04-15T10:05:32.732Z

## Summary

| Metric | Value |
|--------|-------|
| Original question blocks | 462 |
| Unique questions after deduplication | 400 |
| Duplicates removed | 59 |
| Questions with cert2brain references cleaned | 5 |

## Duplicate Questions Removed

The following question IDs appeared more than once. The first occurrence was kept:

- Q290
- Q12
- Q13
- Q28
- Q31
- Q32
- Q33
- Q35
- Q37
- Q42
- Q47
- Q52
- Q53
- Q57
- Q58
- Q61
- Q62
- Q63
- Q67
- Q68
- Q92
- Q111
- Q118
- Q119
- Q123
- Q124
- Q125
- Q126
- Q127
- Q178
- Q179
- Q180
- Q203
- Q204
- Q206
- Q257
- Q269
- Q270
- Q271
- Q275
- Q276
- Q277
- Q278
- Q279
- Q281
- Q282
- Q283
- Q285
- Q306
- Q307
- Q308
- Q312
- Q337
- Q338
- Q345
- Q346
- Q347
- Q348
- Q349

## Cert2Brain References Cleaned

The following questions had cert2brain references that were replaced with "Microsoft-Dokumentation":

- QR36
- Q149
- Q240
- Q242
- Q414

## Renumbering

All questions have been renumbered sequentially from 1 to 400.

## Next Steps

1. Review the audited file: `./src/app/ms102/data/questions-audited.ts`
2. If satisfied, replace the original file:
   ```powershell
   Move-Item -Force "./src/app/ms102/data/questions-audited.ts" "./src/app/ms102/data/questions.ts"
   ```
3. Test the application to ensure all questions render correctly
