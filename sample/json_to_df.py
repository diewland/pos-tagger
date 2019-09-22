import sys
import pandas as pd

for fname in sys.argv[1:]:
    df = pd.read_json(fname)
    print(df)
