#!/usr/bin/env python3

import sys
import re

filename = str(sys.argv[1])
outfile = re.sub(r'.sql', '.sql.out', filename)

def removeMarks( marks, footprint ):
    split = footprint.strip().split(',')
    for mark in sorted(marks, reverse=True):
        del split[mark]
    final = ','.join(split)
    return final

def getCoordinates( string ):
    return string.strip().split()

### Runs for each line
def removeStrays( footprint ):
    list = footprint.split( "," )
    candidates = [] # candidates for removal, is checked for validity
    marks = []      # marked for removal, validity confirmed

    # for each coordinate pair...
    for i in range(len(list)):
        if list[i] == "":
            pass
        else:
            xy = getCoordinates( list[i] )
            x = xy[0]
            if x == "360.0" or x == "0.0":
                candidates.append(i)

    # validate candidates...
    for i in range(len(candidates)):
        c = candidates[i]
        if (c - 1 < 0 or c + 1 > len(list) - 1):
            pass
        else:
            xy = getCoordinates( list[c] )
            x = xy[0]
            xy0 = getCoordinates( list[c-1] )
            x0 = xy0[0]
            xy1 = getCoordinates( list[c+1] )
            x1 = xy1[0]
            if (x0 != "360.0" and x0 != "0.0") and (x1 != "360.0" and x1 != "0.0"):
                pass
            else:
                marks.append( candidates[i] )
    
    return removeMarks( marks, footprint )

def fixLine( line ):
    originalFootprint = line.split('"')[41].strip()
    newFootprint = removeStrays( originalFootprint )

    line = re.sub( originalFootprint, newFootprint, line )
    return line

def main( file ):
    with open( outfile, "w" ) as o:
        for line in file.split("\n"):
            if re.search(r'\(1, "',line) != None:
                line = fixLine( line )
            o.write( line + "\n" )

# open original file
with open(filename) as f:
    print("Running...")
    main( file=f.read() )
    print("Done.")