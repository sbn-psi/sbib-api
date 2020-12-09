#!/usr/bin/env python3

import os
import sys
import re

filename = str(sys.argv[1])
outfile = re.sub(r'.sql', '.sql.out', filename)
print(outfile)
target_id = "1"


def main( file ):
    with open( outfile, "w" ) as o:
        print("files are open")
        for line in file.split("\n"):
            newline = re.sub( r'\'\\\"N\/A\\\"\\r\'', 'NULL', line )
            newline = re.sub( r'\'\\\"N\/A\\"\'', 'NULL', newline)
            newline = re.sub( r'`id`, `image_name`', '`targetId`, `id`, `image_name`', newline)
            newline = re.sub( r'\'\'', 'NULL', newline)
            finalline = newline[:507] + target_id + ', ' + newline[507:] + "\n"
            o.write( finalline )

# open file
with open(filename) as f:
    main( file=f.read() )
    print("Done.")