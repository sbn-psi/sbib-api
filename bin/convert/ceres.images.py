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
            line = re.sub( r'`id`, `image_name`', '`targetId`, `id`, `image_name`', line)
            line = re.sub( r'^\(', '(1, ', line )
            o.write( line + "\n" )

# open file
with open(filename) as f:
    main( file=f.read() )
    print("Done.")