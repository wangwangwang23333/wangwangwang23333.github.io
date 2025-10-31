---
title: 提取邮件文件的全部附件的Python代码
date: 2024-07-05 00:39:17
tags: 技术
---

## 如何提取邮件`.eml`文件的全部附件呢？

可以使用下面这段`python`代码：

```python

import os
import email
from email import policy
from email.parser import BytesParser

def save_attachments_from_eml(eml_file_path, output_dir, file_name):
    # 读取 .eml 文件内容
    with open(eml_file_path, 'rb') as f:
        eml_content = f.read()

    # 解析 .eml 文件
    msg = BytesParser(policy=policy.default).parsebytes(eml_content)
    
    # 检查并保存附件
    for part in msg.iter_attachments():
        filename = part.get_filename()
        if filename:
            file_data = part.get_payload(decode=True)
            
            # 创建输出文件路径
            output_file_path = os.path.join(output_dir, file_name + '-' + filename)
            
            # 将附件数据写入文件
            with open(output_file_path, 'wb') as f:
                f.write(file_data)
            
            print(f"Saved attachment: {output_file_path}")

eml_file_path = '/Users/wangmingjie/Desktop/NET'
output_dir = '/Users/wangmingjie/Desktop/NET-attachment'
os.makedirs(output_dir, exist_ok=True)

# 获取该路径下全部文件
files = os.listdir(eml_file_path)

for file in files:
    if file.endswith('.eml'):
        # 将邮件名称作为file_name
        file_name = file.split('.')[0]
        save_attachments_from_eml(os.path.join(eml_file_path, file), output_dir, file_name)


print('存储完成，共存储了{}个文件'.format(len(files)))

```