import sys
import pandas as pd

for fname in sys.argv[1:]:
    df = pd.read_json(fname)
    df = df.reindex(columns=[ 'sentence', 'token', 'pos_tag', 'mfec_rd', ])
    print(df)
