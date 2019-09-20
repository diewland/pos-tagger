import pythainlp as pythai
import tltk
import pickle
import pandas as pd
import deepcut
import numpy as np
'''
tagp = pythai.pos_tag("ฉัน")
tagt = tltk.pos_tag("ฉัน")

print(tagp, tagt)

with open('RD_DICT_010.pkl', 'rb') as f:
    data = pickle.load(f)

print(type(data))
print(data)

'''
'''
a=['สวัสดีชาวโลก','วันนี้วันศุกร์','ชานมไข่มุกอร่อยมาก','อากาศดีสุดๆไปเลย','หมอกจางๆและควัน']
data = {'sentence': a}
df = pd.DataFrame(data)
df['token'] = df['sentence'].map (lambda x: deepcut.tokenize(x))
df['pos_tag'] = df['token'].map(lambda x: pythai.pos_tag(x))
print(df)
df.to_json('/home/supisara/Desktop/NLP_tltk/test.json')'''

df = pd.read_json('/home/supisara/Desktop/NLP_tltk/test.json')
print(df)
